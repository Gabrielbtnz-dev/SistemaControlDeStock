package com.sistema.sistema.Service.ComprasItemService;

import com.sistema.sistema.Domain.Cajas.Cajas;
import com.sistema.sistema.Domain.Cajas.MovimientoDeCaja;
import com.sistema.sistema.Domain.Compras.Compra;
import com.sistema.sistema.Domain.Compras.ItemCompras;
import com.sistema.sistema.Domain.Person.Person;
import com.sistema.sistema.Domain.Product.Product;
import com.sistema.sistema.Domain.Stock.MovimientoDeStock;
import com.sistema.sistema.Domain.Stock.Stock;
import com.sistema.sistema.Dto.DtoCajas.MovimientosDeCajasDto;
import com.sistema.sistema.Dto.DtoCompra.CompraDtoPost;
import com.sistema.sistema.Dto.DtoCompra.ComprasResumidasDto;
import com.sistema.sistema.Dto.DtoCompra.ItemsCompraPost;
import com.sistema.sistema.Model.*;
import com.sistema.sistema.Service.Enum.Moneda;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ComprasItemService {

    private final PersonRepository personReposi;
    private final ComprasRepository compraReposi;
    private final ProductRepository productReposi;
    private final ItemsCompraRepository itemsReposi;
    private final MovimientoDeCajasRepository movimientoReposi;
    private final CajasRepository cajaReposi;
    private final StockRepository stockReposi;
    private final MovimentoDeStockRepository moviStockReposi;

    public ComprasItemService(PersonRepository personReposi, ComprasRepository compraReposi, ProductRepository productReposi, ItemsCompraRepository itemsReposi, MovimientoDeCajasRepository movimientoReposi, CajasRepository cajaReposi, StockRepository stockReposi, MovimentoDeStockRepository moviStockReposi) {
        this.personReposi = personReposi;
        this.compraReposi = compraReposi;
        this.productReposi = productReposi;
        this.itemsReposi = itemsReposi;
        this.movimientoReposi = movimientoReposi;
        this.cajaReposi = cajaReposi;
        this.stockReposi = stockReposi;
        this.moviStockReposi = moviStockReposi;
    }


    public List<ComprasResumidasDto> getComprasResumidas(){
        return compraReposi.getComprasResumidas();
    }

    @Transactional
    public ResponseEntity<?> addCompra(CompraDtoPost dto){

        if (dto.getCaja() != null) {
            for (MovimientosDeCajasDto item : dto.getCaja()) {

                Cajas caja = cajaReposi.findById(item.getIdCaja())
                        .orElseThrow(() -> new RuntimeException("Caja no encontrada"));

                // Si el movimiento es un EGRESO (salida de dinero de la caja)
                // validamos que tenga saldo suficiente
                if (caja.getSaldo().compareTo(item.getMonto()) < 0) {
                    return ResponseEntity
                            .status(HttpStatus.BAD_REQUEST)
                            .body(Map.of(
                                    "success", false,
                                    "message", "Saldo insuficiente en la caja: " + caja.getName()
                            ));
                }
            }
        }

        Compra compra = new Compra();
        compra.setValorTotal(dto.getValorTotal());
        compra.setValorPendiente(BigDecimal.ZERO);
        compra.setValorRegularizado(dto.getValorTotal());
        compra.setActivo(true);

        Person person = personReposi.findById(dto.getIdPerson())
                .orElseThrow(() -> new RuntimeException("Persona no encontrada"));

        compra.setPerson(person);

        Compra saved = compraReposi.save(compra);



        List<ItemCompras> items = new ArrayList<>();

        if (dto.getItems() != null){
            for (ItemsCompraPost i : dto.getItems()) {

                ItemCompras item = new ItemCompras();
                item.setPrecio(i.getPrecio());
                item.setCantidad(i.getCantidad());
                item.setValor(item.getPrecio().multiply(item.getCantidad()));
                item.setActivo(true);
                item.setCompra(saved);

                Product product = productReposi.findById(i.getIdProducto())
                        .orElseThrow(() -> new RuntimeException("Producto no encontrada"));

                item.setProduct(product);
                items.add(item);
            }
        }

        itemsReposi.saveAll(items);

        saved.setItems(items);
        Map<Long, ItemCompras> itemsMap = items.stream()
                .collect(Collectors.toMap(
                        i -> i.getProduct().getId(),
                        i -> i
                ));

        List<MovimientoDeCaja> movimientos = new ArrayList<>();

        for (MovimientosDeCajasDto item : dto.getCaja()){
            Cajas caja = cajaReposi.findById(item.getIdCaja())
                    .orElseThrow(() -> new RuntimeException("Persona no encontrada"));
            MovimientoDeCaja mov = new MovimientoDeCaja(
                    null,
                    caja,
                    "EGRESO",
                    item.getMonto(),
                    Moneda.PYG,
                    "COMPRA",
                    LocalDateTime.now(),
                    saved
            );
            movimientos.add(mov);
        }
        movimientoReposi.saveAll(movimientos);


        List<Product> productos = productReposi.findAllById(
                dto.getItems().stream()
                        .map(ItemsCompraPost::getIdProducto)
                        .toList()
        );

        Map<Long, Product> productMap = productos.stream()
                .collect(Collectors.toMap(Product::getId, p -> p));

        List<Stock> stocks = stockReposi.findByProduct_IdIn(
                dto.getItems().stream()
                        .map(ItemsCompraPost::getIdProducto)
                        .toList()
        );

        Map<Long, Stock> stockMap = stocks.stream()
                .collect(Collectors.toMap(
                        s -> s.getProduct().getId(),
                        s -> s
                ));

        for (ItemsCompraPost item : dto.getItems()) {

            Product product = productMap.get(item.getIdProducto());

            if (product == null) continue;
            if (!product.getControlaStock()) continue;

            Stock stock = stockMap.get(item.getIdProducto());

            ItemCompras itemCompras = itemsMap.get(item.getIdProducto());

            if (stock == null || itemCompras == null) continue;

            MovimientoDeStock mov = new MovimientoDeStock(
                    item.getPrecio().multiply(item.getCantidad()),
                    "Compra",
                    item.getCantidad(),
                    "INGRESO"

            );

            mov.setStock(stock);
            mov.setItemCompra(itemCompras);
            moviStockReposi.save(mov);
        }

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of(
                        "success", true,
                        "message", "Compra realizada con exito"
                ));
    }

    @Transactional
    public ResponseEntity<?> deleteCompra(Long id){
        Compra compra = compraReposi.findById(id)
                .orElseThrow(() -> new RuntimeException("Acceso denegado"));

        if (compra.getActivo()){
            compra.setActivo(false);
        }else {
            ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Map.of(
                            "success", false,
                            "message", "No puedes desactivar esta Compra"
                    ));
        }

        compraReposi.save(compra);

        itemsReposi.desactivarPorCompra(id);

        List<MovimientoDeCaja> movimiento = movimientoReposi.findByCompraId(id);
        System.out.println("SIZE MOV STOCK: " + movimiento.size());
        for (MovimientoDeCaja mov : movimiento ){
            MovimientoDeCaja movimientoInverso = new MovimientoDeCaja();

            movimientoInverso.setCaja(mov.getCaja());
            movimientoInverso.setDescripcion("Desactivacion de compra N: " + mov.getCompra().getId());
            movimientoInverso.setFecha(LocalDateTime.now());
            movimientoInverso.setMoneda(mov.getMoneda());
            movimientoInverso.setTipoMovimiento("INGRESO");
            movimientoInverso.setMonto(mov.getMonto());
            movimientoInverso.setCompra(mov.getCompra());

            movimientoReposi.save(movimientoInverso);
        }

        List<MovimientoDeStock> movimientoStock = moviStockReposi.findByItemCompraCompraId(id);
        System.out.println("SIZE MOV STOCK: " + movimientoStock.size());
        for (MovimientoDeStock movStock : movimientoStock){
            MovimientoDeStock movimientoInverso = new MovimientoDeStock();
            movimientoInverso.setStock(movStock.getStock());
            movimientoInverso.setItemCompra(movStock.getItemCompra());
            movimientoInverso.setValor(movStock.getValor());
            movimientoInverso.setObservacion("Desactivacion Compra N: " + movStock.getItemCompra().getCompra().getId());
            movimientoInverso.setCantidad(movStock.getCantidad());
            movimientoInverso.setTipomovimiento("EGRESO");

            moviStockReposi.save(movimientoInverso);
        }


        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of(
                        "success", true,
                        "message", "Compra desactivada con exito"
                ));
    }

}

package com.sistema.sistema.Service.SalesItemService;

import com.sistema.sistema.Domain.Cajas.Cajas;
import com.sistema.sistema.Domain.Cajas.MovimientoDeCaja;
import com.sistema.sistema.Domain.Person.Person;
import com.sistema.sistema.Domain.Product.Product;
import com.sistema.sistema.Domain.Sales.ItemsSales;
import com.sistema.sistema.Domain.Sales.Sales;
import com.sistema.sistema.Domain.Stock.MovimientoDeStock;
import com.sistema.sistema.Domain.Stock.Stock;
import com.sistema.sistema.Dto.DtoCajas.MovimientosDeCajasDto;
import com.sistema.sistema.Dto.DtoSales.ItemsSalesDto;
import com.sistema.sistema.Dto.DtoSales.SalesDto;
import com.sistema.sistema.Dto.DtoSales.SalesDtoGet;
import com.sistema.sistema.Dto.DtoSales.SalesTotalDelMesyMesAnterior;
import com.sistema.sistema.Dto.DtoStock.MovimientoDeStockDto;
import com.sistema.sistema.Model.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class SalesItemsService {

    private final ItemSalesRepository itemReposi;
    private final SalesRepository salesReposi;
    private final PersonRepository personReposi;
    private final MovimientoDeCajasRepository moviReposi;
    private final CajasRepository cajaReposi;
    private final ProductRepository productReposi;
    private final StockRepository stockReposi;
    private final MovimentoDeStockRepository moviStockReposi;
    /*mas de una variable en un solo constructor, mas de un repository*/
    public SalesItemsService(ItemSalesRepository itemReposi, SalesRepository salesReposi, PersonRepository personReposi, MovimientoDeCajasRepository moviReposi, CajasRepository cajaReposi, ProductRepository productReposi, StockRepository stockReposi, MovimentoDeStockRepository moviStockReposi) {
        this.itemReposi = itemReposi;
        this.salesReposi = salesReposi;
        this.personReposi = personReposi;
        this.moviReposi = moviReposi;
        this.cajaReposi = cajaReposi;
        this.productReposi = productReposi;
        this.stockReposi = stockReposi;
        this.moviStockReposi = moviStockReposi;
    }

    public List<Map<String, Object>> getGraficoVentasPorAgno() {
        return salesReposi.getVentasGrafico();
    }

    public List<SalesDtoGet> getSales(){
        return salesReposi.getVentasResumidas();
    }

    public SalesTotalDelMesyMesAnterior getTotalVentasMesMesAnterior(){
        return salesReposi.getTotalVentasMes();
    }

   public ResponseEntity<?> addSales( SalesDto dto){
       Sales sales = new Sales();
       sales.setValorTotal(dto.getValorTotal());
       sales.setValorRegularizado(dto.getValorRegularizado());
       sales.setValorPendiente(dto.getValorPendiente());
       sales.setObservaciones(dto.getObservaciones());
       sales.setActivo(true);

       Person person = personReposi.findById(dto.getIdPerson())
               .orElseThrow(() -> new RuntimeException("Persona no encontrada"));

       sales.setPerson(person);

       Sales saved = salesReposi.save(sales);

       List<ItemsSales> items = new ArrayList<>();

       if (dto.getItems() != null) {
           for (ItemsSalesDto i : dto.getItems()) {

               ItemsSales item = new ItemsSales();
               item.setPrecio(i.getPrecio());
               item.setCantidad(i.getCantidad());
               item.setValor(i.getValor());
               /* se busca el id producto*/
               Product product = productReposi.findById(i.getIdProducto())
                       .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
                item.setProduct(product);
               item.setSales(saved);

               items.add(item);
           }
       }

       itemReposi.saveAll(items);


       saved.setItems(items);
       Map<Long, ItemsSales> itemsMap = items.stream()
               .collect(Collectors.toMap(
                       i -> i.getProduct().getId(),
                       i -> i
               ));
       List<MovimientoDeCaja> movimientos = new ArrayList<>();

       for (MovimientosDeCajasDto item : dto.getCaja()){

           Cajas caja = cajaReposi.findById(item.getIdCaja())
                   .orElseThrow(() -> new RuntimeException("Caja no encontrada"));

           MovimientoDeCaja mov = new MovimientoDeCaja(
                   saved,
                   caja,
                   "INGRESO",
                   item.getMonto(),
                   item.getMoneda(),
                   "VENTA",
                   LocalDateTime.now(),
                   null
           );
           movimientos.add(mov);
       }

       moviReposi.saveAll(movimientos);


       List<Product> productos = productReposi.findAllById(
               dto.getItems().stream()
                       .map(ItemsSalesDto::getIdProducto)
                       .toList()
       );

       Map<Long, Product> productMap = productos.stream()
               .collect(Collectors.toMap(Product::getId, p -> p));

       List<Stock> stocks = stockReposi.findByProduct_IdIn(
               dto.getItems().stream()
                       .map(ItemsSalesDto::getIdProducto)
                       .toList()
       );

       Map<Long, Stock> stockMap = stocks.stream()
               .collect(Collectors.toMap(
                       s -> s.getProduct().getId(),
                       s -> s
               ));

       for (ItemsSalesDto item : dto.getItems()) {

           Product product = productMap.get(item.getIdProducto());

           if (product == null) continue;
           if (!product.getControlaStock()) continue;

           Stock stock = stockMap.get(item.getIdProducto());

           ItemsSales itemSale = itemsMap.get(item.getIdProducto());

           if (stock == null || itemSale == null) continue;

           MovimientoDeStock mov = new MovimientoDeStock(
                   stock.getPrecio().multiply(item.getCantidad()),
                   "venta",
                   item.getCantidad(),
                   "EGRESO"
           );

           mov.setStock(stock);
           mov.setItemsSales(itemSale);
           moviStockReposi.save(mov);
       }


       return ResponseEntity
               .status(HttpStatus.CREATED)
               .body(Map.of(
                       "success", true,
                       "message", "Venta realizada con exito"
               ));
    }

    public ResponseEntity<?> deleteSales(Long id){
        Sales sales = salesReposi.findById(id)
                .orElseThrow(()-> new RuntimeException("No se encontro la venta"));

        System.out.println(sales.getActivo());

        if (sales.getActivo()){
            sales.setActivo(false);
        }else {
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(Map.of(
                            "success", false,
                            "message", "La venta ya esta inactiva"
                    ));
        }

        itemReposi.desactivarPorVenta(id);

        List<MovimientoDeCaja> movimiento = moviReposi.findByVentaId(id);

        for (MovimientoDeCaja mov : movimiento ){
            MovimientoDeCaja movimientoInverso = new MovimientoDeCaja();

            movimientoInverso.setCaja(mov.getCaja());
            movimientoInverso.setDescripcion("Desactivacion de venta id venta: " + mov.getVenta().getId());
            movimientoInverso.setFecha(LocalDateTime.now());
            movimientoInverso.setMoneda(mov.getMoneda());
            movimientoInverso.setTipoMovimiento("EGRESO");
            movimientoInverso.setMonto(mov.getMonto());
            movimientoInverso.setVenta(mov.getVenta());

            moviReposi.save(movimientoInverso);
        }

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of(
                        "success", true,
                        "message", "Venta desactivada con exito"
                ));


    }

}

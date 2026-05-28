package com.sistema.sistema.Service.ComprasItemService;

import com.sistema.sistema.Domain.Cajas.Cajas;
import com.sistema.sistema.Domain.Cajas.MovimientoDeCaja;
import com.sistema.sistema.Domain.Compras.Compra;
import com.sistema.sistema.Domain.Compras.ItemCompras;
import com.sistema.sistema.Domain.Person.Person;
import com.sistema.sistema.Domain.Product.Product;
import com.sistema.sistema.Dto.DtoCajas.MovimientosDeCajasDto;
import com.sistema.sistema.Dto.DtoCompra.CompraDtoPost;
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

@Service
public class ComprasItemService {

    private final PersonRepository personReposi;
    private final ComprasRepository compraReposi;
    private final ProductRepository productReposi;
    private final ItemsCompraRepository itemsReposi;
    private final MovimientoDeCajasRepository movimientoReposi;
    private final CajasRepository cajaReposi;

    public ComprasItemService(PersonRepository personReposi, ComprasRepository compraReposi, ProductRepository productReposi, ItemsCompraRepository itemsReposi, MovimientoDeCajasRepository movimientoReposi, CajasRepository cajaReposi) {
        this.personReposi = personReposi;
        this.compraReposi = compraReposi;
        this.productReposi = productReposi;
        this.itemsReposi = itemsReposi;
        this.movimientoReposi = movimientoReposi;
        this.cajaReposi = cajaReposi;
    }

    @Transactional
    public ResponseEntity<?> addCompra(CompraDtoPost dto){
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

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of(
                        "success", true,
                        "message", "Compra realizada con exito"
                ));
    }

}

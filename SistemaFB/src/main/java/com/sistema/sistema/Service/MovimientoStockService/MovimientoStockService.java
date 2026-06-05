package com.sistema.sistema.Service.MovimientoStockService;

import com.sistema.sistema.Domain.Product.Product;
import com.sistema.sistema.Domain.Stock.MovimientoDeStock;
import com.sistema.sistema.Domain.Stock.Stock;
import com.sistema.sistema.Dto.DtoStock.AjusteDeStockDtoPost;
import com.sistema.sistema.Dto.DtoStock.MovimientoDeStockDtoGet;
import com.sistema.sistema.Model.MovimentoDeStockRepository;
import com.sistema.sistema.Model.ProductRepository;
import com.sistema.sistema.Model.StockRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class MovimientoStockService {

    private final MovimentoDeStockRepository moviStockReposi;
    private final StockRepository stockReposi;

    public MovimientoStockService(MovimentoDeStockRepository moviStockReposi, ProductRepository productReposi, StockRepository stockReposi) {
        this.moviStockReposi = moviStockReposi;
        this.stockReposi = stockReposi;
    }

    public List<MovimientoDeStockDtoGet> getMovimientoStock(){
        return moviStockReposi.getMovimientosDeStock();
    }

    public ResponseEntity <?> postAjusteDeStock(AjusteDeStockDtoPost dto, Long id){

        MovimientoDeStock movimiento = new MovimientoDeStock();

        movimiento.setCantidad(dto.getCantidad());
        movimiento.setValor(dto.getPrecio().multiply(dto.getCantidad()));
        movimiento.setObservacion("Ajuste de Stock");
        Stock stock = stockReposi.findByProduct_Id(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        movimiento.setStock(stock);
        movimiento.setTipomovimiento(dto.getTipo());

        moviStockReposi.save(movimiento);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of(
                        "success", true,
                        "message", "Ajuste realizado correctamente"
                ));
    }
}

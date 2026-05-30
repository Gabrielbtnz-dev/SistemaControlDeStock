package com.sistema.sistema.Service.MovimientoStockService;

import com.sistema.sistema.Dto.DtoStock.MovimientoDeStockDtoGet;
import com.sistema.sistema.Model.MovimentoDeStockRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class MovimientoStockService {

    private final MovimentoDeStockRepository moviStockReposi;

    public MovimientoStockService(MovimentoDeStockRepository moviStockReposi) {
        this.moviStockReposi = moviStockReposi;
    }

    public List<MovimientoDeStockDtoGet> getMovimientoStock(){
        return moviStockReposi.getMovimientosDeStock();
    }
}

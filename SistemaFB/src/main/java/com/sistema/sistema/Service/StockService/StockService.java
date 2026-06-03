package com.sistema.sistema.Service.StockService;

import com.sistema.sistema.Dto.DtoStock.StockDisponibilidadDto;
import com.sistema.sistema.Dto.DtoStock.StockValorTotalDto;
import com.sistema.sistema.Model.StockRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockService {
    private final StockRepository StockReposi;

    public StockService(StockRepository stockReposi) {
        StockReposi = stockReposi;
    }

    public StockValorTotalDto getStockValorTotal(){
        return StockReposi.getValorTotalStock();
    }

    public List<StockDisponibilidadDto> getDisponibilidadStock(){
        return StockReposi.obtenerDisponibilidadStock();
    }
}

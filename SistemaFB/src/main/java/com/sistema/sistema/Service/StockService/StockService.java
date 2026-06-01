package com.sistema.sistema.Service.StockService;

import com.sistema.sistema.Dto.DtoStock.StockValorTotalDto;
import com.sistema.sistema.Model.StockRepository;
import org.springframework.stereotype.Service;

@Service
public class StockService {
    private final StockRepository StockReposi;

    public StockService(StockRepository stockReposi) {
        StockReposi = stockReposi;
    }

    public StockValorTotalDto getStockValorTotal(){
        return StockReposi.getValorTotalStock();
    }
}

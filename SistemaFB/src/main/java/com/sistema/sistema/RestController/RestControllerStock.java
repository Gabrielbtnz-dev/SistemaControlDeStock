package com.sistema.sistema.RestController;

import com.sistema.sistema.Dto.DtoStock.StockValorTotalDto;
import com.sistema.sistema.Service.StockService.StockService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestControllerStock {

    private final StockService stockService;

    public RestControllerStock(StockService stockService) {
        this.stockService = stockService;
    }

    @GetMapping("/stockestadistica")
    public StockValorTotalDto getValorTotalStock(){
        return stockService.getStockValorTotal();
    }
}

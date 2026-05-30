package com.sistema.sistema.RestController;

import com.sistema.sistema.Dto.DtoStock.MovimientoDeStockDtoGet;
import com.sistema.sistema.Service.MovimientoStockService.MovimientoStockService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RestControllerMovimientoStock {

    private final MovimientoStockService MovimientoService;

    public RestControllerMovimientoStock(MovimientoStockService movimientoService) {
        MovimientoService = movimientoService;
    }


    @GetMapping("/movimientostock")
    public List<MovimientoDeStockDtoGet> getMovimientoStock(){
        return MovimientoService.getMovimientoStock();
    }
}

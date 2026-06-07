package com.sistema.sistema.RestController;

import com.sistema.sistema.Dto.DtoStock.AjusteDeStockDtoPost;
import com.sistema.sistema.Dto.DtoStock.MovimientoDeStockDtoGet;
import com.sistema.sistema.Service.MovimientoStockService.MovimientoStockService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RestControllerMovimientoStock {

    private final MovimientoStockService MovimientoService;

    public RestControllerMovimientoStock(MovimientoStockService movimientoService) {
        MovimientoService = movimientoService;
    }

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/movimientostock")
    public List<MovimientoDeStockDtoGet> getMovimientoStock(){
        return MovimientoService.getMovimientoStock();
    }

    @PostMapping("/ajustarstock/{id}")
    public ResponseEntity<?> postAjusteDeStock(@RequestBody AjusteDeStockDtoPost dto, @PathVariable Long id){
        return MovimientoService.postAjusteDeStock(dto, id);
    }
}

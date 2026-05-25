package com.sistema.sistema.RestController;

import com.sistema.sistema.Dto.DtoCajas.MovimientosDeCajasDto;
import com.sistema.sistema.Service.MovimientosDeCajasService.MoviminetosDeCajasService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RestControllerMovimientosDeCajas {

    private final MoviminetosDeCajasService movimientoService;

    public RestControllerMovimientosDeCajas(MoviminetosDeCajasService movimientoService) {
        this.movimientoService = movimientoService;
    }

    @GetMapping("/movimientosdecajas")
    public List<MovimientosDeCajasDto> getMovimientosDeCajas(){
        return movimientoService.getMovimientosDeCajas();
    }
}

package com.sistema.sistema.RestController;

import com.sistema.sistema.Dto.DtoCajas.MovimientosDeCajasDto;
import com.sistema.sistema.Service.MovimientosDeCajasService.MoviminetosDeCajasService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RestControllerMovimientosDeCajas {

    private final MoviminetosDeCajasService movimientoService;

    public RestControllerMovimientosDeCajas(MoviminetosDeCajasService movimientoService) {
        this.movimientoService = movimientoService;
    }
    @PreAuthorize("hasAuthority('Reportes de caja')")
    @GetMapping("/movimientosdecajas")
    public List<MovimientosDeCajasDto> getMovimientosDeCajas(){
        return movimientoService.getMovimientosDeCajas();
    }
}

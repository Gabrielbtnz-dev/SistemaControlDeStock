package com.sistema.sistema.RestController;

import com.sistema.sistema.Dto.DtoRegistroFinanciero.RegistroFinancieroDtoPost;
import com.sistema.sistema.Dto.DtoRegistroFinanciero.RegistroFinancieroGet;
import com.sistema.sistema.Service.RegistroFinancieroService.RegistroFinancieroService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RestControllerRegistroFinanciero {
    private final RegistroFinancieroService registroFinancieroService;

    public RestControllerRegistroFinanciero(RegistroFinancieroService registroFinancieroService) {
        this.registroFinancieroService = registroFinancieroService;
    }

    @PreAuthorize("hasAuthority('Crear registro financiero ingreso')")
    @PostMapping("/registrofinancieroingreso")
    public ResponseEntity<?> postRegistroFinancieroingreso(@RequestBody RegistroFinancieroDtoPost dto){
        return registroFinancieroService.addRegistroFinancieroIngreso(dto);
    }

    @PreAuthorize("hasAuthority('Crear registro financiero egreso')")
    @PostMapping("/registrofinancieroegreso")
    public ResponseEntity<?> postRegistroFinancieroegreso(@RequestBody RegistroFinancieroDtoPost dto){
        return registroFinancieroService.addRegistroFinancieroEgreso(dto);
    }

    @PreAuthorize("hasAuthority('Leer registro financiero')")
    @GetMapping("/registrofinanciero")
    public List<RegistroFinancieroGet> getRegistroFinanciero(){
        return registroFinancieroService.getRegistroFinanciero();
    }
}

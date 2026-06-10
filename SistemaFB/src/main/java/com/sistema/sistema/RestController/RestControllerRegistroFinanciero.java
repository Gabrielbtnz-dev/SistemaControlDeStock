package com.sistema.sistema.RestController;

import com.sistema.sistema.Dto.DtoRegistroFinanciero.RegistroFinancieroDtoPost;
import com.sistema.sistema.Service.RegistroFinancieroService.RegistroFinancieroService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestControllerRegistroFinanciero {
    private final RegistroFinancieroService registroFinancieroService;

    public RestControllerRegistroFinanciero(RegistroFinancieroService registroFinancieroService) {
        this.registroFinancieroService = registroFinancieroService;
    }

    @PreAuthorize("hasAuthority('Editar productos')")
    @PostMapping("/registrofinanciero")
    public ResponseEntity<?> postRegistroFinanciero(@RequestBody RegistroFinancieroDtoPost dto){
        return registroFinancieroService.addRegistroFinancieroIngreso(dto);
    }
}

package com.sistema.sistema.RestController;

import com.sistema.sistema.Dto.DtoCompra.CompraDtoPost;
import com.sistema.sistema.Service.ComprasItemService.ComprasItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestControllerCompra {

    private final ComprasItemService compraService;

    public RestControllerCompra(ComprasItemService compraService) {
        this.compraService = compraService;
    }

    @PostMapping("/addcompra")
    public ResponseEntity<?> addCompra(@RequestBody CompraDtoPost dto){
        return compraService.addCompra(dto);
    }
}

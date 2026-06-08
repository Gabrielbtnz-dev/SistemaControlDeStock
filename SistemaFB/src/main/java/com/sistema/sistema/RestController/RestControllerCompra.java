package com.sistema.sistema.RestController;

import com.sistema.sistema.Dto.DtoCompra.CompraDtoPost;
import com.sistema.sistema.Dto.DtoCompra.ComprasResumidasDto;
import com.sistema.sistema.Service.ComprasItemService.ComprasItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RestControllerCompra {

    private final ComprasItemService compraService;

    public RestControllerCompra(ComprasItemService compraService) {
        this.compraService = compraService;
    }
    @PreAuthorize("hasAuthority('Reportes de compras')")
    @GetMapping("/comprasresumidas")
    public List<ComprasResumidasDto> getComprasResumidas(){
        return compraService.getComprasResumidas();
    }

    @PreAuthorize("hasAuthority('Crear compras')")
    @PostMapping("/addcompra")
    public ResponseEntity<?> addCompra(@RequestBody CompraDtoPost dto){
        return compraService.addCompra(dto);
    }

    @PreAuthorize("hasAuthority('Eliminar compras')")
    @DeleteMapping("/deletecompra/{id}")
    public ResponseEntity<?> deleteCompra(@PathVariable Long id){
        return compraService.deleteCompra(id);
    }

}

package com.sistema.sistema.RestController;

import com.sistema.sistema.Dto.DtoProduct.ProductDtoGet;
import com.sistema.sistema.Dto.DtoProduct.ProductDtoPost;
import com.sistema.sistema.Dto.DtoProduct.ProductDtoUpdate;
import com.sistema.sistema.Service.ProductService.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RestControllerProduct {
    private final ProductService productService;

    public RestControllerProduct(ProductService productService) {
        this.productService = productService;
    }

    @PreAuthorize("hasAuthority('Ver todos los productos')")
    @GetMapping("/product")
    public List<ProductDtoGet> getProduct(){
        return productService.getProduct();
    }

    @PreAuthorize("hasAuthority('Agregar nuevo producto')")
    @PostMapping("/addProduct")
    public ResponseEntity<?> postProduct(@RequestBody ProductDtoPost dto){
        return productService.postProduct(dto);
    }

    @PreAuthorize("hasAuthority('Eliminar productos')")
    @DeleteMapping("/deleteProduct/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id){
        return productService.deleteProduct(id);
    }

    @PreAuthorize("hasAuthority('Editar productos')")
    @PatchMapping("/updateProduct/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody ProductDtoUpdate dto){
       return productService.updateProduct(id,dto);
    }

}

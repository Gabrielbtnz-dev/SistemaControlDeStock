package com.sistema.sistema.RestController;

import com.sistema.sistema.Dto.PersonDtoGet;
import com.sistema.sistema.Dto.ProductDtoGet;
import com.sistema.sistema.Dto.ProductDtoPost;
import com.sistema.sistema.Dto.ProductDtoUpdate;
import com.sistema.sistema.Service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RestControllerProduct {
    private final ProductService productService;

    public RestControllerProduct(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/product")
    public List<ProductDtoGet> getProduct(){
        return productService.getProduct();
    }

    @PostMapping("/addProduct")
    public ResponseEntity<?> postProduct(@RequestBody ProductDtoPost dto){
        return productService.postProduct(dto);
    }

    @DeleteMapping("/deleteProduct/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id){
        return productService.deleteProduct(id);
    }

    @PatchMapping("/updateProduct/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody ProductDtoUpdate dto){
       return productService.updateProduct(id,dto);
    }



}

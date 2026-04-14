package com.sistema.sistema.RestController;

import com.sistema.sistema.Dto.PersonDtoGet;
import com.sistema.sistema.Dto.ProductDtoGet;
import com.sistema.sistema.Service.ProductService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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



}

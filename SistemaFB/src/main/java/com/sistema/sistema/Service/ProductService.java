package com.sistema.sistema.Service;

import com.sistema.sistema.Domain.Product;
import com.sistema.sistema.Dto.ProductDtoGet;
import com.sistema.sistema.Dto.ProductDtoPost;
import com.sistema.sistema.Dto.ProductDtoUpdate;
import com.sistema.sistema.Model.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Map;

@Service
public class ProductService {
    private final ProductRepository productReposi;

    public ProductService(ProductRepository productReposi) {
        this.productReposi = productReposi;
    }

    public List<ProductDtoGet> getProduct(){
        return productReposi.findAllByOrderByIdDesc().stream().map(
                p-> new ProductDtoGet(
                        p.getId(),
                        p.getName(),
                        p.getPrice(),
                        p.getMoneda(),
                        p.getControlaStock(),
                        p.getActivo()
                ))
        .toList();
    }


    public ResponseEntity<?> postProduct( ProductDtoPost dto){
        Product product = new Product();
        product.setName(dto.getName());
        product.setPrice(dto.getPrice());
        product.setMoneda(dto.getMoneda());
        product.setControlaStock(dto.getControlaStock());
        product.setActivo(true);

        productReposi.save(product);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of(
                        "success", true,
                        "message", "Producto agregado correctamente",
                        "data", product.getId()
                ));
    }


    public ResponseEntity<?> deleteProduct(Long id){
       Product product = productReposi.findById(id)
               .orElseThrow(()-> new RuntimeException("No se encontro el producto"));

       if ( product.getActivo() ){
           product.setActivo(false);
       }

       productReposi.save(product);

       return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of(
                        "success", true,
                        "message", "Producto Desactivado !"
                ));
    }


}

package com.sistema.sistema.Service;

import com.sistema.sistema.Dto.ProductDtoGet;
import com.sistema.sistema.Model.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.util.stream.Collectors.toList;

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


}

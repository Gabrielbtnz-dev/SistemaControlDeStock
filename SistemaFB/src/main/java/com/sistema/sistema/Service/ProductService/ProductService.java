package com.sistema.sistema.Service.ProductService;

import com.sistema.sistema.Domain.Product.Product;
import com.sistema.sistema.Domain.Stock.Stock;
import com.sistema.sistema.Dto.DtoProduct.ProductDtoGet;
import com.sistema.sistema.Dto.DtoProduct.ProductDtoPost;
import com.sistema.sistema.Dto.DtoProduct.ProductDtoUpdate;
import com.sistema.sistema.Model.ProductRepository;
import com.sistema.sistema.Model.StockRepository;
import com.sistema.sistema.Service.Enum.Moneda;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Service
public class ProductService {
    private final ProductRepository productReposi;
    private final StockRepository stockReposi;

    public ProductService(ProductRepository productReposi, StockRepository stockReposi) {
        this.productReposi = productReposi;
        this.stockReposi = stockReposi;
    }

    public List<ProductDtoGet> getProduct(){
        return productReposi.getProduct();
    }


    public ResponseEntity<?> postProduct( ProductDtoPost dto){
        Product product = new Product();
        product.setName(dto.getName());
        product.setPrice(dto.getPrice());
        product.setMoneda(Moneda.PYG);
        product.setControlaStock(dto.getControlaStock());
        product.setActivo(true);
        product.setCodigoDeBarras(dto.getCodigoDeBarras());

        productReposi.save(product);

        Stock stock = new Stock();
        stock.setProduct(product);
        stock.setCantidad(BigDecimal.ZERO);
        stock.setCantidad(BigDecimal.ZERO);
        stock.setPrecio(BigDecimal.ZERO);
        stock.setValor(BigDecimal.ZERO);

        stockReposi.save(stock);
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

    public ResponseEntity<?> updateProduct(Long id, ProductDtoUpdate dto){
        Product product = productReposi.findById(id)
                .orElseThrow(()-> new RuntimeException("No se encontro el producto"));

        if ( dto.getName() != null && !dto.getName().equals(product.getName()) ){
            product.setName(dto.getName());
        }

        if ( dto.getControlaStock() != null && !dto.getControlaStock().equals(product.getControlaStock()) ){
            product.setControlaStock(dto.getControlaStock());
        }

        if (dto.getMoneda() != null && !dto.getMoneda().equals(product.getMoneda())){
            product.setMoneda(dto.getMoneda());
        }

        if (dto.getPrice() != null && !dto.getPrice().equals(product.getPrice())){
            product.setPrice(dto.getPrice());
        }


        productReposi.save(product);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of(
                        "success", true,
                        "message", "Producto editado !"
                ));
    }


}

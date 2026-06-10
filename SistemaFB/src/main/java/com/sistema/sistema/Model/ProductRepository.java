package com.sistema.sistema.Model;

import com.sistema.sistema.Domain.Product.Product;
import com.sistema.sistema.Dto.DtoProduct.ProductDtoGet;
import com.sistema.sistema.Dto.DtoSales.SalesTotalDelMesyMesAnterior;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findAllByOrderByIdDesc();



    @Query(value = """
         SELECT
         p.id,
         p.name,
         p.price,
         p.moneda,
         p.controla_stock,
         p.activo,
         p.codigo_de_barras,
         s.valor,
         s.precio,
         s.cantidad
         FROM product p
         LEFT JOIN stock s ON s.id_product = p.id
    """, nativeQuery = true)
    List<ProductDtoGet> getProduct();
}

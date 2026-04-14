package com.sistema.sistema.Model;

import com.sistema.sistema.Domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findAllByOrderByIdDesc();
}

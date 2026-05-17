package com.sistema.sistema.Model;

import com.sistema.sistema.Domain.Sales.Sales;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SalesRepository extends JpaRepository<Sales, Long> {
    List<Sales> findAllByOrderByIdDesc();
}

package com.sistema.sistema.Model;

import com.sistema.sistema.Domain.Sales.ItemsSales;
import com.sistema.sistema.Domain.Sales.Sales;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemSalesRepository extends JpaRepository<ItemsSales, Long> {
    List<ItemsSales> findAllByOrderByIdDesc();
}

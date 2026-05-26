package com.sistema.sistema.Model;

import com.sistema.sistema.Domain.Sales.ItemsSales;
import com.sistema.sistema.Domain.Sales.Sales;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ItemSalesRepository extends JpaRepository<ItemsSales, Long> {
    List<ItemsSales> findAllByOrderByIdDesc();

    @Modifying
    @Transactional
    @Query(value = "UPDATE items_sales SET activo = false WHERE id_venta = :id", nativeQuery = true)
    void desactivarPorVenta(@Param("id") Long id);
}

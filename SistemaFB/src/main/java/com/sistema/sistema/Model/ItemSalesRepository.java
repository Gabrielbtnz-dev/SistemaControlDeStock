package com.sistema.sistema.Model;

import com.sistema.sistema.Domain.Sales.ItemsSales;
import com.sistema.sistema.Domain.Sales.Sales;
import com.sistema.sistema.Dto.DtoSales.ItemsSalesDto;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ItemSalesRepository extends JpaRepository<ItemsSales, Long> {
    List<ItemsSales> findAllByOrderByIdDesc();

    @Query("""
        SELECT new com.sistema.sistema.Dto.DtoSales.ItemsSalesDto(
            i.precio,
            i.valor,
            i.cantidad,
            p.id,
            i.activo,
            p.name
        )
        FROM ItemsSales i
        JOIN i.product p
        WHERE i.sales.id = :idVenta
        """)
    List<ItemsSalesDto> findItemsByVentaId(@Param("idVenta") Long idVenta);

    @Modifying
    @Transactional
    @Query(value =
            "UPDATE items_sales SET activo = false WHERE id_venta = :id", nativeQuery = true)
    void desactivarPorVenta(@Param("id") Long id);
}

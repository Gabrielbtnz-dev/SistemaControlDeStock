package com.sistema.sistema.Model;

import com.sistema.sistema.Domain.Sales.Sales;
import com.sistema.sistema.Dto.DtoSales.SalesDtoGet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SalesRepository extends JpaRepository<Sales, Long> {
    List<Sales> findAllByOrderByIdDesc();

    @Query("""
    SELECT new com.sistema.sistema.Dto.DtoSales.SalesDtoGet(
        p.id,
        v.valorTotal,
        v.valorRegularizado,
        v.valorPendiente,
        v.observaciones,
        p.nombre,
        v.id,
        v.activo
    )
        FROM Sales v
        JOIN v.person p
        ORDER BY v.id DESC
    """)
    List<SalesDtoGet> getVentasResumidas();
}

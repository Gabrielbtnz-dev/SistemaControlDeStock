package com.sistema.sistema.Model;

import com.sistema.sistema.Domain.Compras.Compra;
import com.sistema.sistema.Dto.DtoCompra.ComprasDetalladasDto;
import com.sistema.sistema.Dto.DtoCompra.ComprasResumidasDto;
import com.sistema.sistema.Dto.DtoSales.SalesDtoGet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ComprasRepository extends JpaRepository<Compra, Long> {

    List<Compra> findAllByOrderByIdDesc();

    @Query("""
    SELECT new com.sistema.sistema.Dto.DtoCompra.ComprasResumidasDto(
        p.id,
        c.valorTotal,
        c.valorRegularizado,
        c.valorPendiente,
        c.observaciones,
        p.nombre,
        c.id,
        c.activo,
        c.createdAt
    )
        FROM Compra c
        JOIN c.person p
        ORDER BY c.id DESC
    """)
    List<ComprasResumidasDto> getComprasResumidas();

    @Query("""
        SELECT new com.sistema.sistema.Dto.DtoCompra.ComprasDetalladasDto(
            p.id,
            c.valorTotal,
            c.valorRegularizado,
            c.valorPendiente,
            c.observaciones,
            p.nombre,
            c.id,
            c.activo,
            c.createdAt,
            p.documento,
            p.digitoVerificador
        )
        FROM Compra c
        JOIN c.person p
        WHERE c.id = :id
    """)
    ComprasDetalladasDto getComprasDetallas(@Param("id") Long id);
}

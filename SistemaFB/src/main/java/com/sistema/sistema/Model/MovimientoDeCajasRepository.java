package com.sistema.sistema.Model;

import com.sistema.sistema.Domain.Cajas.MovimientoDeCaja;
import com.sistema.sistema.Dto.DtoCajas.MovimientosDeCajasDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.lang.ScopedValue;
import java.util.List;

public interface MovimientoDeCajasRepository extends JpaRepository<MovimientoDeCaja, Long> {
    List<MovimientoDeCaja> findAllByOrderByIdDesc();

    @Query("""
        SELECT new com.sistema.sistema.Dto.DtoCajas.MovimientosDeCajasDto(
            c.id,
            m.tipoMovimiento,
            m.monto,
            m.moneda,
            m.descripcion,
            m.fecha,
            c.name,
            s.id,
            com.id,
            rf.id
        )
        FROM MovimientoDeCaja m
        JOIN m.caja c
        LEFT JOIN m.venta s
        LEFT JOIN m.compra com
        LEFT JOIN m.registroFinanciero rf
        ORDER BY m.id DESC
        """)
    List<MovimientosDeCajasDto> getMovimientosDecajas();

    List<MovimientoDeCaja> findByVentaId(Long idVenta);

    List<MovimientoDeCaja> findByCompraId(Long id);

    @Query("""
        SELECT new com.sistema.sistema.Dto.DtoCajas.MovimientosDeCajasDto(
            c.id,
            m.tipoMovimiento,
            m.monto,
            m.moneda,
            m.descripcion,
            m.fecha,
            c.name,
            s.id,
            com.id,
            rf.id
        )
        FROM MovimientoDeCaja m
        JOIN m.caja c
        LEFT JOIN m.venta s
        LEFT JOIN m.compra com
        LEFT JOIN m.registroFinanciero rf
        WHERE rf.id = :idRegistroFinanciero
        ORDER BY m.id DESC
        """)
    List<MovimientosDeCajasDto> getMovimientosPorRegistroFinanciero(
            @Param("idRegistroFinanciero") Long idRegistroFinanciero
    );

    List<MovimientoDeCaja> findByRegistroFinancieroId(Long id);
}

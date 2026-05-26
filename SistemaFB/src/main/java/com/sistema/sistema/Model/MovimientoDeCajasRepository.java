package com.sistema.sistema.Model;

import com.sistema.sistema.Domain.Cajas.MovimientoDeCaja;
import com.sistema.sistema.Dto.DtoCajas.MovimientosDeCajasDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

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
            s.id
        )
        FROM MovimientoDeCaja m
        JOIN m.caja c
        JOIN m.venta s
        ORDER BY m.id DESC
        """)
    List<MovimientosDeCajasDto> getMovimientosDecajas();

    List<MovimientoDeCaja> findByVentaId(Long idVenta);
}

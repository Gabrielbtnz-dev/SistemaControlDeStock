package com.sistema.sistema.Model;

import com.sistema.sistema.Domain.Stock.MovimientoDeStock;
import com.sistema.sistema.Dto.DtoCajas.MovimientosDeCajasDto;
import com.sistema.sistema.Dto.DtoStock.MovimientoDeStockDtoGet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MovimentoDeStockRepository extends JpaRepository<MovimientoDeStock, Long> {

    List<MovimientoDeStock> findAllByOrderByIdDesc();

    @Query("""
    SELECT new com.sistema.sistema.Dto.DtoStock.MovimientoDeStockDtoGet(
        s.id,
        COALESCE(ip.name, sp.name),
        COALESCE(pc.nombre, ps.nombre),
        m.valor,
        m.observacion,
        m.cantidad,
        m.tipomovimiento,
        c.id,
        sl.id,
        COALESCE(ip.moneda, sp.moneda),
        m.createdAt
    )
    FROM MovimientoDeStock m
    JOIN m.stock s
    LEFT JOIN m.itemCompra ic
    LEFT JOIN ic.product ip
    LEFT JOIN ic.compra c
    LEFT JOIN c.person pc
    LEFT JOIN m.itemsSales it
    LEFT JOIN it.product sp
    LEFT JOIN it.sales sl
    LEFT JOIN sl.person ps
    ORDER BY m.createdAt  DESC
""")
    List<MovimientoDeStockDtoGet> getMovimientosDeStock();
}

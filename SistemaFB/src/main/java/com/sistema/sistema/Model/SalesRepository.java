package com.sistema.sistema.Model;

import com.sistema.sistema.Domain.Sales.Sales;
import com.sistema.sistema.Dto.DtoSales.SalesDocumentoDto;
import com.sistema.sistema.Dto.DtoSales.SalesDtoGet;
import com.sistema.sistema.Dto.DtoSales.SalesTotalDelMesyMesAnterior;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface SalesRepository extends JpaRepository<Sales, Long> {
    List<Sales> findAllByOrderByIdDesc();

    @Query("""
        SELECT new com.sistema.sistema.Dto.DtoSales.SalesDocumentoDto(
            s.id,
            s.valorTotal,
            s.valorRegularizado,
            s.valorPendiente,
            s.observaciones,
            s.activo,
            s.createdAt,
            p.id,
            p.nombre,
            p.documento,
            p.funcionario,
            p.cliente,
            p.contribuyente,
            p.digitoVerificador
        )
        FROM Sales s
        JOIN s.person p
        WHERE s.id = :id
        """)
    SalesDocumentoDto findVentaCabecera(@Param("id") Long id);

    @Query("""
    SELECT new com.sistema.sistema.Dto.DtoSales.SalesDtoGet(
        p.id,
        v.valorTotal,
        v.valorRegularizado,
        v.valorPendiente,
        v.observaciones,
        p.nombre,
        v.id,
        v.activo,
        v.createdAt
    )
        FROM Sales v
        JOIN v.person p
        ORDER BY v.id DESC
    """)
    List<SalesDtoGet> getVentasResumidas();

    @Query(value = """
                WITH ventas_mensuales AS (
                SELECT
                    COALESCE(SUM(CASE
                        WHEN v.created_at >= date_trunc('month', CURRENT_DATE)
                        THEN v.valor_total ELSE 0 END), 0) AS actual,
                    COALESCE(SUM(CASE
                        WHEN v.created_at >= date_trunc('month', CURRENT_DATE - INTERVAL '1 month')
                        AND v.created_at < date_trunc('month', CURRENT_DATE)
                        THEN v.valor_total ELSE 0 END), 0) AS anterior
                FROM ventas v
                WHERE v.activo = TRUE
            )
            SELECT
                actual AS totalVentaMesActual,
                anterior AS totalVentaMesAnterior,
                CASE
                    WHEN anterior = 0 THEN 0
                    ELSE ROUND(((actual - anterior) * 100.0 / anterior), 2)
                END AS porcentajeVariacion,
  
                CASE
                    WHEN actual >= anterior THEN TRUE
                    ELSE FALSE
                END AS subio
            FROM ventas_mensuales;
    """, nativeQuery = true)
    SalesTotalDelMesyMesAnterior getTotalVentasMes();

    @Query(value = """
        WITH meses AS (
            SELECT generate_series(
                date_trunc('year', CURRENT_DATE),
                date_trunc('year', CURRENT_DATE) + INTERVAL '11 months',
                INTERVAL '1 month'
            ) AS mes
        ),
        ventas_agrupadas AS (
            SELECT
                date_trunc('month', created_at) AS mes,
                SUM(CASE
                    WHEN EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM CURRENT_DATE)
                    THEN valor_total ELSE 0 END
                ) AS actual,
        
                SUM(CASE
                    WHEN EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM CURRENT_DATE) - 1
                    THEN valor_total ELSE 0 END
                ) AS anterior
            FROM ventas
            WHERE activo = true
            GROUP BY date_trunc('month', created_at)
        )
        
        SELECT
            TO_CHAR(m.mes, 'TMMonth') AS month,
        
            COALESCE(v.actual, 0) AS year_actual,
            COALESCE(v.anterior, 0) AS year_anterior
        
        FROM meses m
        LEFT JOIN ventas_agrupadas v ON m.mes = v.mes
        ORDER BY m.mes
        """, nativeQuery = true)
    List<Map<String, Object>> getVentasGrafico();

}

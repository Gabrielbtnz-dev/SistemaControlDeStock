package com.sistema.sistema.Model;

import com.sistema.sistema.Domain.Stock.Stock;
import com.sistema.sistema.Dto.DtoStock.StockValorTotalDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface StockRepository extends JpaRepository<Stock, Long> {
    List<Stock> findAllByOrderByIdDesc();

    List<Stock> findByProduct_IdIn(List<Long> list);

    @Query(value = """
        SELECT COALESCE(SUM(s.valor), 0)
        FROM stock s
        """, nativeQuery = true)
    StockValorTotalDto getValorTotalStock();
}

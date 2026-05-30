package com.sistema.sistema.Model;

import com.sistema.sistema.Domain.Stock.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StockRepository extends JpaRepository<Stock, Long> {
    List<Stock> findAllByOrderByIdDesc();

    List<Stock> findByProduct_IdIn(List<Long> list);
}

package com.sistema.sistema.Model;

import com.sistema.sistema.Domain.Stock.MovimientoDeStock;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MovimentoDeStockRepository extends JpaRepository<MovimientoDeStock, Long> {

    List<MovimientoDeStock> findAllByOrderByIdDesc();
}

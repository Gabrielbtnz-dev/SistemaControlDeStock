package com.sistema.sistema.Model;

import com.sistema.sistema.Domain.Cajas.MovimientoDeCaja;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MovimientoDeCajasRepository extends JpaRepository<MovimientoDeCaja, Long> {
    List<MovimientoDeCaja> findAllByOrderByIdDesc();
}

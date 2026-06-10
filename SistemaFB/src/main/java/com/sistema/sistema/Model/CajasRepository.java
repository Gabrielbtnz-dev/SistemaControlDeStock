package com.sistema.sistema.Model;

import com.sistema.sistema.Domain.Cajas.Cajas;
import com.sistema.sistema.Domain.Cajas.MovimientoDeCaja;
import com.sistema.sistema.Dto.DtoCajas.CajasDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CajasRepository extends JpaRepository<Cajas, Long> {
    List<Cajas> findAllByOrderByIdDesc();

    List<Cajas> findByIdIn(List<Long> ids);
}

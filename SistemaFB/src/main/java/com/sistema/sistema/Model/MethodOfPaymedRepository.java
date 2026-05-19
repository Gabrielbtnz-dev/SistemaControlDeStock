package com.sistema.sistema.Model;

import com.sistema.sistema.Domain.MethodOfPaymed.Cajas;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MethodOfPaymedRepository extends JpaRepository<Cajas, Long> {
    List<Cajas> findAllByOrderByIdDesc();
}

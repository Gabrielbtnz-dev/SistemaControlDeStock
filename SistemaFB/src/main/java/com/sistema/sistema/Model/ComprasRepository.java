package com.sistema.sistema.Model;

import com.sistema.sistema.Domain.Compras.Compra;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComprasRepository extends JpaRepository<Compra, Long> {

    List<Compra> findAllByOrderByIdDesc();
}

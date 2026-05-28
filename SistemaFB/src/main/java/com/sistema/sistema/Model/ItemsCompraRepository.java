package com.sistema.sistema.Model;

import com.sistema.sistema.Domain.Compras.ItemCompras;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemsCompraRepository extends JpaRepository<ItemCompras, Long> {
    List<ItemCompras> findAllByOrderByIdDesc();
}

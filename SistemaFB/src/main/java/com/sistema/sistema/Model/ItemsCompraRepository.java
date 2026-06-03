package com.sistema.sistema.Model;

import com.sistema.sistema.Domain.Compras.ItemCompras;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ItemsCompraRepository extends JpaRepository<ItemCompras, Long> {
    List<ItemCompras> findAllByOrderByIdDesc();

    @Modifying
    @Transactional
    @Query(value =
            "UPDATE items_compra SET activo = false WHERE id_compra = :id", nativeQuery = true)
    void desactivarPorCompra(@Param("id") Long id);
}

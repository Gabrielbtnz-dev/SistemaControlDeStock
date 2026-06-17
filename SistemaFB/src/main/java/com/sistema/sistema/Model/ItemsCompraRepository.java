package com.sistema.sistema.Model;

import com.sistema.sistema.Domain.Compras.ItemCompras;
import com.sistema.sistema.Dto.DtoCompra.ItemsCompraDetalladasDto;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ItemsCompraRepository extends JpaRepository<ItemCompras, Long> {
    List<ItemCompras> findAllByOrderByIdDesc();

    @Query("""
        SELECT new com.sistema.sistema.Dto.DtoCompra.ItemsCompraDetalladasDto(
            ic.precio,
            ic.valor,
            ic.cantidad,
            ic.product.id,
            ic.activo,
            p.name
        )
        FROM ItemCompras ic
        JOIN ic.product p
        WHERE ic.compra.id = :id
    """)
    List<ItemsCompraDetalladasDto> getItemsCompraDetalla(@Param("id") Long id);

    @Modifying
    @Transactional
    @Query(value =
            "UPDATE items_compra SET activo = false WHERE id_compra = :id", nativeQuery = true)
    void desactivarPorCompra(@Param("id") Long id);
}

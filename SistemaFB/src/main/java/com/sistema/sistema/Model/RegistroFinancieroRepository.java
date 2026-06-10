package com.sistema.sistema.Model;

import com.sistema.sistema.Domain.ResgistroFinanciero.RegistroFinanciero;
import com.sistema.sistema.Dto.DtoProduct.ProductDtoGet;
import com.sistema.sistema.Dto.DtoRegistroFinanciero.RegistroFinancieroGet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface RegistroFinancieroRepository extends JpaRepository<RegistroFinanciero, Long> {

    @Query(value = """
       SELECT
        rf.id,
        rf.contado,
        rf.fecha_emison,
        rf.moneda,
        rf.observacion,
        rf.tipo_operacion,
        rf.valor,
        p.nombre
        FROM registro_financiero rf
           JOIN person p ON p.id = rf.id_person;
    """, nativeQuery = true)
    List<RegistroFinancieroGet> getRegistroFinanciero();

}

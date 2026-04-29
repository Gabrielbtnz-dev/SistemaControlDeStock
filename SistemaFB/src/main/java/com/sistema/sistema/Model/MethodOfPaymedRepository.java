package com.sistema.sistema.Model;

import com.sistema.sistema.Domain.methodOfPaymed;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MethodOfPaymedRepository extends JpaRepository<methodOfPaymed, Long> {
    List<methodOfPaymed> findAllByOrderByIdDesc();
}

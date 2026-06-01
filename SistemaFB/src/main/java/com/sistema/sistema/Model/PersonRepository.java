package com.sistema.sistema.Model;

import com.sistema.sistema.Domain.Person.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PersonRepository extends JpaRepository<Person, Long> {
    List<Person> findAllByOrderByIdDesc();

    @Query(value = """
    SELECT COUNT(*)
    FROM person p
    WHERE p.activo = true
    """, nativeQuery = true)
    Long countPersonasActivas();

}
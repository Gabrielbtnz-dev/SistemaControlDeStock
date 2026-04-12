package com.sistema.sistema.Model;

import com.sistema.sistema.Domain.Person;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PersonRepository extends JpaRepository<Person, Long> {
    List<Person> findAllByOrderByIdDesc();

}

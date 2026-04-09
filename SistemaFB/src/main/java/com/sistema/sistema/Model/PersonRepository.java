package com.sistema.sistema.Model;

import com.sistema.sistema.Domain.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Long> {

}

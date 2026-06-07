package com.sistema.sistema.Model;

import com.sistema.sistema.Domain.Usuario.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RolesRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByname(String name);
}

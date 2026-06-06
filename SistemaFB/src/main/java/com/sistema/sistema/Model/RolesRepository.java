package com.sistema.sistema.Model;

import com.sistema.sistema.Domain.Usuario.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RolesRepository extends JpaRepository<Role, Long> {
}

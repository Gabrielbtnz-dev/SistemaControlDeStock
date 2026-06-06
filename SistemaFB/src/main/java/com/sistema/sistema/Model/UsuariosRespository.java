package com.sistema.sistema.Model;

import com.sistema.sistema.Domain.Usuario.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuariosRespository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByname(String name);

    //verificar si existe el usuario

    Boolean existsByName(String name);
}

package com.sistema.sistema.Service.Security;

import com.sistema.sistema.Domain.Usuario.Role;
import com.sistema.sistema.Domain.Usuario.Usuario;
import com.sistema.sistema.Model.UsuariosRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailService implements UserDetailsService {
    private UsuariosRespository usuarioRepo;

    @Autowired
    public CustomUserDetailService(UsuariosRespository usuarioRepo) {
        this.usuarioRepo = usuarioRepo;
    }

    public Collection<GrantedAuthority> mapToAutorities(List<Role> roles){
        return roles.stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());
    }

    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepo.findByname(name).orElseThrow(()-> new UsernameNotFoundException("Usuario no encontrado"));
        return new User(usuario.getName(), usuario.getPassword(),
                mapToAutorities(usuario.getRoles()));
    }
}

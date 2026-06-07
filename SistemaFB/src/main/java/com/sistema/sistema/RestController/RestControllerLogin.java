package com.sistema.sistema.RestController;

import com.sistema.sistema.Domain.Usuario.Role;
import com.sistema.sistema.Domain.Usuario.Usuario;
import com.sistema.sistema.Dto.DtoUsuario.AuthResponse;
import com.sistema.sistema.Dto.DtoUsuario.UsuarioDto;
import com.sistema.sistema.Dto.DtoUsuario.UsuarioLoginDto;
import com.sistema.sistema.Model.RolesRepository;
import com.sistema.sistema.Model.UsuariosRespository;
import com.sistema.sistema.Service.Security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
public class RestControllerLogin {
    private AuthenticationManager authenticationManager;
    private PasswordEncoder passwordEncoder;
    private RolesRepository rolesRepository;
    private JwtTokenProvider jwtGenerator;
    private UsuariosRespository usuariosRespository;

    @Autowired
    public RestControllerLogin(AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder, RolesRepository rolesRepository, JwtTokenProvider jwtGenerator, UsuariosRespository usuariosRespository) {
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.rolesRepository = rolesRepository;
        this.jwtGenerator = jwtGenerator;
        this.usuariosRespository = usuariosRespository;
    }

    @PostMapping("/registro")
    public ResponseEntity<String> registrar(@RequestBody UsuarioDto dtoUsuario){
        if (usuariosRespository.existsByName(dtoUsuario.getUsername())){
            return new ResponseEntity<>("El usuario ya existe", HttpStatus.BAD_REQUEST);
        }

        Usuario usuario = new Usuario();

        usuario.setName(dtoUsuario.getUsername());
        usuario.setPassword(passwordEncoder.encode(dtoUsuario.getPassword()));
        usuariosRespository.save(usuario);
        System.out.println("LLego hasta aca");
        return new ResponseEntity<>("Registro Exitoso",HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody UsuarioLoginDto dtoLogin){
        Authentication authentication = authenticationManager.authenticate( new UsernamePasswordAuthenticationToken(
                dtoLogin.getUsername(),
                dtoLogin.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtGenerator.generarToken(authentication);
        return new ResponseEntity<>(new AuthResponse(token), HttpStatus.OK);
    }
}

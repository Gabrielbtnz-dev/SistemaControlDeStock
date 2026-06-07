package com.sistema.sistema.Service.Security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.apache.tomcat.websocket.AuthenticationException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenProvider {

    //metodo para crear la autentication

    public String generarToken(Authentication authentication){
        String username = authentication.getName();
        Date tiempoActual = new Date();
        Date expiracionToken = new Date(tiempoActual.getTime() + ConstSecurity.jwtExpirationToken);

        //generar el token
        String token = Jwts.builder()
                .subject(username)
                .setIssuedAt(new Date())
                .setExpiration(expiracionToken)
                .signWith(SignatureAlgorithm.HS512,ConstSecurity.jwtFirma)
                .compact();
        return token;
    }
    ///metodo que extrae el nombre usuario

    public String obtenerUsuarioNombreDeJwt(String token) {

        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        Claims claims = Jwts.parser()
                .verifyWith(ConstSecurity.jwtFirma)
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return claims.getSubject();
    }
    /// metodo validar toke
    public Boolean validarToken(String token) {
        try {

            if (token.startsWith("Bearer ")) {
                token = token.substring(7);
            }

            Jwts.parser()
                    .verifyWith(ConstSecurity.jwtFirma)
                    .build()
                    .parseSignedClaims(token);

            return true;

        } catch (Exception e) {
            throw new AuthenticationCredentialsNotFoundException("Sesion expirada");
        }
    }

}



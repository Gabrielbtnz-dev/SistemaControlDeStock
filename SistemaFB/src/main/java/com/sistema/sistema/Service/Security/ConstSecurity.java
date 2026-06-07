package com.sistema.sistema.Service.Security;

import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;

public class ConstSecurity {
    public static final long jwtExpirationToken = 1000 * 60 * 60 * 6;
    public static final SecretKey jwtFirma =
            Keys.secretKeyFor(io.jsonwebtoken.SignatureAlgorithm.HS512);

}

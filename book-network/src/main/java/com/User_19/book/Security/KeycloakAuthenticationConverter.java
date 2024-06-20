package com.User_19.book.Security;

import org.springframework.core.convert.converter.Converter;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

import static java.util.stream.Collectors.toSet;

public class KeycloakAuthenticationConverter implements Converter<Jwt, AbstractAuthenticationToken> {
    @Override
    public AbstractAuthenticationToken convert(@NonNull Jwt source) {
        return new JwtAuthenticationToken(
                source,
                Stream.concat(new JwtGrantedAuthoritiesConverter().convert(source).stream(),extractResourceRoles(source).stream()).collect(toSet())

        );
    }
    private Collection<? extends GrantedAuthority> extractResourceRoles(Jwt jwt){
        var ressourceAccess= new HashMap<>(jwt.getClaim("resource_access"));
        var eternal=(Map <String , List<String>>) ressourceAccess.get("account");
        var roles =eternal.get("roles");
        return roles.stream().map(e-> new SimpleGrantedAuthority("ROLE"+e.replace("-","_"))).collect(toSet());


    }
}

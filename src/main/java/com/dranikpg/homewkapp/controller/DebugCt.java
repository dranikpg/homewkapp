package com.dranikpg.homewkapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
public class DebugCt {

    @Value("${hw.greet}")
    String greet;

    @Autowired
    PersistentTokenRepository trepo;


    @GetMapping("/")
    public String root(){
        return greet;
    }


    @Secured("ROLE_ADMIN")
    @RequestMapping("/token")
    public String token(HttpServletRequest r){
        Authentication au = SecurityContextHolder.getContext().getAuthentication();
        if(au.isAuthenticated()){
            return String.valueOf(trepo.getTokenForSeries(au.getName()));
        }
        return "";
    }


}

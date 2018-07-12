package com.dranikpg.homewkapp.controller;

import com.dranikpg.homewkapp.entity.User;
import com.dranikpg.homewkapp.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.LinkedList;
import java.util.List;

@RestController
public class DebugCt {


    @Autowired
    PersistentTokenRepository trepo;

    @RequestMapping("/token")
    public String token(HttpServletRequest r){
        Authentication au = SecurityContextHolder.getContext().getAuthentication();
        if(au.isAuthenticated()){
            return String.valueOf(trepo.getTokenForSeries(au.getName()));
        }
        return "";
    }




}

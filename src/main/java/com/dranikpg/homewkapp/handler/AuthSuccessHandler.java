package com.dranikpg.homewkapp.handler;

import com.dranikpg.homewkapp.entity.User;
import org.pmw.tinylog.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class AuthSuccessHandler implements AuthenticationSuccessHandler {


    @Value("${hw.auth.redirect}")
    public String sc;


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException {

        Logger.debug("GOOD LOGIN");

        //set our response to OK status
        response.setStatus(HttpServletResponse.SC_OK);

        response.sendRedirect(sc);
    }
}
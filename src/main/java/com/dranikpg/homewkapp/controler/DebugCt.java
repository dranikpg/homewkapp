package com.dranikpg.homewkapp.controler;

import com.dranikpg.homewkapp.entity.User;
import com.dranikpg.homewkapp.repo.UserRepo;
import org.apache.tomcat.jni.Time;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

import static org.springframework.security.web.context.HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY;

@RestController
public class DebugCt {

    @GetMapping("/")
    public String home(){
        Authentication at = SecurityContextHolder.getContext().getAuthentication();
        if(at == null) return "NULL";
        else{
            return at.getName();
        }
    }

    @Autowired
    AuthenticationProvider authP;

    @Autowired
    UserRepo urepo;

    @Autowired
    PasswordEncoder enc;

    @Autowired
    PersistentTokenRepository trepo;

    @GetMapping("/all")
    @ResponseBody
    public List<User> all(){
        List<User> l = new LinkedList<>();
        for(User u : urepo.findAll()) l.add(u);
        return l;
    }

    @RequestMapping("/pc")
    public String logC(HttpServletRequest r){
        for(Cookie c : r.getCookies()){
            if(c.getName().equals("test")) return c.getValue();
        }
        return "redirect:/gc";
    }

    @RequestMapping("/gc")
    public String genCk(@RequestParam("val")String val, HttpServletResponse r){
        Cookie c = new Cookie("test",val);
        c.setMaxAge(100*100*100);
        c.setDomain("127.0.0.1");
        r.addCookie(c);
        return "redirect:/pc";
    }

    @RequestMapping("/token")
    public String token(HttpServletRequest r){
        Authentication au = SecurityContextHolder.getContext().getAuthentication();
        if(au.isAuthenticated()){
            return String.valueOf(trepo.getTokenForSeries(au.getName()));
        }
        return "";
    }




}

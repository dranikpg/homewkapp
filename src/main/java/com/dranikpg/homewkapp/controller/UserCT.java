package com.dranikpg.homewkapp.controller;

import com.dranikpg.homewkapp.dto.UserDTO;
import com.dranikpg.homewkapp.entity.User;
import com.dranikpg.homewkapp.repo.UserRepo;
import com.dranikpg.homewkapp.service.UserService;
import org.pmw.tinylog.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

@RestController
public class UserCT {

    @Lazy
    @Autowired
    UserRepo urepo;

    @Lazy
    @Autowired
    UserService us;

    @Lazy
    @Autowired
    PasswordEncoder enc;

    @GetMapping("/user")
    public Object user(){
        User u = us.currentUser();
        if(u == null) return null;
        return new UserDTO(u);
    }


    @Secured("ROLE_ADMIN")
    @GetMapping("/users")
    @ResponseBody
    public Object users(){
        Logger.debug("");
        return urepo.findAll();
    }


    @GetMapping("/user/create")
    public String createUser(@RequestParam(name = "id") String id, @RequestParam(name = "pw") String pw,
                           HttpServletResponse rsp) throws Exception {

        if(urepo.findByNick(id).size() > 0) {
            rsp.sendRedirect("/users");
            return "";
        }

        User u = new User();
        u.setNick(id);
        u.setName(id+"_name");
        u.setPassword(enc.encode(pw));
        urepo.saveAndFlush(u);
        /* Auto hop
        Authentication auth =
                new UsernamePasswordAuthenticationToken(u, null, u.getAuthorities());
        SecurityC
        ontextHolder.getContext().setAuthentication(auth);*/
        return "OK";
    }

}

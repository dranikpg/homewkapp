package com.dranikpg.homewkapp.controller;

import com.dranikpg.homewkapp.dto.UserDTO;
import com.dranikpg.homewkapp.entity.Task;
import com.dranikpg.homewkapp.entity.User;
import com.dranikpg.homewkapp.repo.UserRepo;
import com.dranikpg.homewkapp.service.TaskService;
import com.dranikpg.homewkapp.service.UserService;
import com.dranikpg.homewkapp.util.Util;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.pmw.tinylog.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

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
    TaskService ts;

    @Lazy
    @Autowired
    PasswordEncoder enc;


    @Secured("ROLE_ADMIN")
    @GetMapping("users")
    public String users(){
        us.flushUserChanges();

        List<User> ur = urepo.findAll();

        StringBuilder out = new StringBuilder(ur.size()*40);
        for(User u:ur){
            out.append(Util.fixed(""+u.getId(),3));
            out.append(Util.fixed(u.getNick(),8)).append(" ");
            if(u.getActive() == null)out.append("-");
            else out.append(u.getActive().toString());
            out.append("<br/>");
        }

        return out.toString();
    }

    @Secured("ROLE_ADMIN")
    @GetMapping("/user/{nick}")
    @ResponseBody
    public String userdata(@PathVariable  String nick) throws JsonProcessingException {
        List<User> ul = us.searchNick(nick);
        if(ul == null||ul.size() == 0)return "NULL";
        User u = ul.get(0);
        ObjectMapper m = new ObjectMapper();
        return m.writerWithDefaultPrettyPrinter().writeValueAsString(u);
    }

    @Secured("ROLE_ADMIN")
    @GetMapping("/user_entries/{nick}")
    @ResponseBody
    public String userentries(@PathVariable String nick) throws JsonProcessingException {
        List<User> userlist = us.searchNick(nick);
        if(userlist == null||userlist.size() == 0)return "NO USER";
        User u = userlist.get(0);

        List<Task> tasklist = ts.ofUser(u);

        if(tasklist == null)return "NONE";

        ObjectMapper mp = new ObjectMapper();
        return mp.writerWithDefaultPrettyPrinter().writeValueAsString(tasklist);
    }



    @GetMapping("/user")
    public UserDTO user(){
        User u = us.currentUser();
        if(u == null) return null;
        us.updateActive(u);
        return new UserDTO(u);
    }

    @Secured("ROLE_ADMIN")
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
        u.setLocked(false);
        urepo.saveAndFlush(u);
        return "OK";
    }

}

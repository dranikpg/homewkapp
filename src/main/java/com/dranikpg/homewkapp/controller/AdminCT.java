package com.dranikpg.homewkapp.controller;

import com.dranikpg.homewkapp.entity.Task;
import com.dranikpg.homewkapp.entity.User;
import com.dranikpg.homewkapp.service.TaskService;
import com.dranikpg.homewkapp.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AdminCT {

    @Lazy
    @Autowired
    UserService us;


    @Lazy
    @Autowired
    TaskService ts;

    @Secured("ROLE_ADMIN")
    @GetMapping("/admin")
    public String guide(){
        StringBuilder b = new StringBuilder();
        b.append("api/users").append("<br/>");
        b.append("api/user_entries/{nick}").append("<br/>");
        b.append("api/user/{nick}").append("<br/>");
        b.append("api/del_entries/{nick}").append("<br/>");
        b.append("api/get_all").append("<br/>");
        return b.toString();
    }

    @Secured("ROLE_ADMIN")
    @GetMapping("/del_entries/{nick}")
    @ResponseBody
    public String deleteUserEntries(@PathVariable String nick){
        List<User> userlist = us.searchNick(nick);
        if(userlist == null||userlist.size() == 0)return "NO USER";
        User u = userlist.get(0);
        ts.deleteOfUser(u);
        return "OK";
    }

    @Secured("ROLE_ADMIN")
    @GetMapping("/get_all")
    @ResponseBody
    public String getall() throws JsonProcessingException {
        List<Task> ta = ts.all();
        ObjectMapper mp = new ObjectMapper();
        return "<pre>"+
                mp.writerWithDefaultPrettyPrinter().writeValueAsString(ta)
                +"</pre>";
    }


}

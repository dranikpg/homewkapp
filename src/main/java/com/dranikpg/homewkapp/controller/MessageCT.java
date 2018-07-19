package com.dranikpg.homewkapp.controller;

import com.dranikpg.homewkapp.entity.Message;
import com.dranikpg.homewkapp.service.MessageService;
import org.pmw.tinylog.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
public class MessageCT {

    @Lazy
    @Autowired
    MessageService ms;

    @Secured("ROLE_USER")
    @GetMapping("/msg")
    public List<Message> msg(){
        return ms.getAll();
    }

    @Secured("ROLE_ADMIN")
    @PostMapping("/msg")
    public String edit(HttpServletRequest rq){
        String type = rq.getParameter("t");
        Logger.debug(type);
        if(type == null) return "F";
        if(type.equals("R")){
            try{
                ms.delete(Long.parseLong(rq.getParameter("id")));
            }catch (Exception e){
                Logger.error(e);
                return "F";
            }
        }else if(type.equals("C")){
            try{
                ms.create(rq.getParameter("content"));
            }catch (Exception e){
                Logger.error(e);
                return "F";
            }
        }else if(type.equals("D")){
            ms.drop();
        }
        return "-";
    }

}

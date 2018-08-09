package com.dranikpg.homewkapp.controller;

import com.dranikpg.homewkapp.service.StatService;
import com.dranikpg.homewkapp.stat.i.StatBag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

@RestController
public class StatCT {

    @Autowired
    StatService s;

    @Secured("ROLE_USER")
    @GetMapping("stat")
    @ResponseBody
    public HashMap<String, List<? extends StatBag>> get(){
        return s.get();
    }

    @Secured("ROLE_USER")
    @GetMapping("updstat")
    @ResponseBody
    public String updatestat(){
        s.update();
        return "OK";
    }


}

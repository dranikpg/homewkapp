package com.dranikpg.homewkapp.controller;

import com.dranikpg.homewkapp.service.SubjectTableS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
public class SubjectTableCT {

    @Autowired
    SubjectTableS ts;

    @RequestMapping("/table")
    @ResponseBody
    public Object table(@RequestParam(name = "d", required = false, defaultValue = "-1") int d){
        if(d == -1){
            return ts.t();
        }else{
            return ts.t().get(d);
        }
    }

}

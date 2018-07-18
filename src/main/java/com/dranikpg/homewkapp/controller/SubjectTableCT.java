package com.dranikpg.homewkapp.controller;

import com.dranikpg.homewkapp.service.SubjectTableS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SubjectTableCT {

    @Autowired
    SubjectTableS ts;

    @Secured("ROLE_USER")
    @RequestMapping("/table")
    @ResponseBody
    public Object table(){
        return ts.d();
    }

}

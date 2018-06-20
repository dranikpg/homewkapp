package com.dranikpg.homewkapp.controller;

import com.dranikpg.homewkapp.entity.Task;
import com.dranikpg.homewkapp.service.TaskService;
import dint.Dint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
public class TaskCT {

    @Lazy
    @Autowired
    TaskService ts;

    @GetMapping("/drop")
    public String drop(HttpServletResponse r) throws IOException {
        ts.drop();
        r.sendRedirect("/all");
        return "";
    }

    @GetMapping("/all")
    @ResponseBody
    public List<Task> all(){
        return ts.all();
    }

    @GetMapping("/pend")
    @ResponseBody
    public List<Task> pending(){
        return ts.pending(Dint.today());
    }

    @GetMapping("/my")
    @ResponseBody
    public List<Task> my(){
        return ts.ofCurrentUser();
    }

    @GetMapping("/task")
    public String create(@RequestParam(name = "d") int d,
                         @RequestParam(name = "sub") String sub,
                         @RequestParam(name = "title") String titile,
                         HttpServletResponse rsp) throws IOException {

        ts.create(d, sub, titile);
        rsp.sendRedirect("/all");
        return "";
    }

}

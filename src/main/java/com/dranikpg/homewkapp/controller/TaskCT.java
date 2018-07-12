package com.dranikpg.homewkapp.controller;

import com.dranikpg.homewkapp.dto.TaskLRestDTO;
import com.dranikpg.homewkapp.entity.Task;
import com.dranikpg.homewkapp.service.CacheManager;
import com.dranikpg.homewkapp.service.SubjectTableS;
import com.dranikpg.homewkapp.service.TaskService;
import com.dranikpg.homewkapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
public class TaskCT {

    @Lazy
    @Autowired
    TaskService ts;

    @Lazy
    @Autowired
    CacheManager cm;

    @Lazy
    @Autowired
    UserService us;

    @Lazy
    @Autowired
    SubjectTableS ss;

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
    public HashMap<Integer, HashMap<String, ArrayList<TaskLRestDTO>>> pending(){
        return cm.pendingTasks();
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

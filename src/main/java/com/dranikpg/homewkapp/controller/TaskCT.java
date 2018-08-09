package com.dranikpg.homewkapp.controller;

import com.dranikpg.homewkapp.dto.TaskDTO;
import com.dranikpg.homewkapp.dto.TaskRDTO;
import com.dranikpg.homewkapp.entity.Task;
import com.dranikpg.homewkapp.service.TaskService;
import com.dranikpg.homewkapp.service.UserService;
import org.pmw.tinylog.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
    UserService us;

    @Secured("ROLE_USER")
   // @PreAuthorize("#contact.name == authentication.name")
    @GetMapping("/pend")
    @ResponseBody
    public HashMap<Integer, HashMap<String, ArrayList<TaskDTO>>> pending(HttpServletRequest rq){
        HashMap<Integer, HashMap<String, ArrayList<TaskDTO>>> taskM;
        long st = System.currentTimeMillis();
        System.out.println("Rebuilding task map");
        List<Task> tl = ts.fpending();
        taskM = new HashMap<>();
        for (Task t : tl) {
            if(t.getUser() == null) continue;
            if (!taskM.containsKey(t.expd)) taskM.put(t.expd, new HashMap<>());
            TaskDTO d = new TaskDTO(t);
            if (!taskM.get(t.expd).containsKey(t.subj))
                taskM.get(t.expd).put(t.subj, new ArrayList<>());
            taskM.get(t.expd).get(t.subj).add(d);
        }
        System.out.println("TOOK " + (System.currentTimeMillis() - st));
        return taskM;
    }

    @Secured("ROLE_USER")
    @PostMapping("/edit")
    public String edit( @RequestBody TaskRDTO dto){
        Logger.info("");

        String type = dto.getType();
        System.out.println("Edit request " + type);

        if(type == null) {
            Logger.info("No type request");
            return "F";
        }

        System.out.println(dto.toString());

        if(type.equals("C")){
            try {
                ts.create(dto);
            }catch (Exception e){
                Logger.error(e);
                return "";
            }
            return "OK";

        }else if(type.equals("E")){
            try{
                ts.edit(dto);
            }catch (Exception e){
                Logger.error(e);
                return "F";
            }
            return "OK";

        }else if(type.equals("D")){
            try{
                ts.delete(dto.id);
            }catch (Exception e){
                Logger.error(e);
                return "F";
            }
            return "OK";
        }


        return "F";
    }

}

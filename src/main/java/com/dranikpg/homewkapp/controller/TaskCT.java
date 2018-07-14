package com.dranikpg.homewkapp.controller;

import com.dranikpg.homewkapp.dto.TaskLRestDTO;
import com.dranikpg.homewkapp.entity.Task;
import com.dranikpg.homewkapp.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
public class TaskCT {
    @Lazy
    @Autowired
    TaskService ts;

    @GetMapping("/pend")
    @ResponseBody
    public HashMap<Integer, HashMap<String, ArrayList<TaskLRestDTO>>> pending(){

        HashMap<Integer, HashMap<String, ArrayList<TaskLRestDTO>>> taskM;
        long st = System.currentTimeMillis();
        System.out.println("Rebuilding task map");
        List<Task> tl = ts.fpending();
        taskM = new HashMap<>();
        for (Task t : tl) {
            if(t.getUser() == null) continue;

            if (!taskM.containsKey(t.expd)) taskM.put(t.expd, new HashMap<>());

            TaskLRestDTO d = new TaskLRestDTO(t);

            if (!taskM.get(t.expd).containsKey(t.subj))
                taskM.get(t.expd).put(t.subj, new ArrayList<>());

            taskM.get(t.expd).get(t.subj).add(0,d);
        }
        System.out.println("TOOK " + (System.currentTimeMillis() - st));
        return taskM;
    }

    @PostMapping("/edit")
    public String edit(HttpServletRequest rq){
        String type = rq.getParameter("type");

        System.out.println("Edit request " + type);

        if(type == null) return "F";

        else if(type.equals("C")){
            try {
                ts.create(
                        Integer.parseInt(rq.getParameter("date")),
                        rq.getParameter("subj"),
                        rq.getParameter("desc")
                );
            }catch (Exception e){
                e.printStackTrace();
                return "";
            }
            return "OK";

        }else if(type.equals("E")){
            try{
                ts.edit(
                        Integer.parseInt(rq.getParameter("id")),
                        rq.getParameter("desc")
                );
            }catch (Exception e){
                e.printStackTrace();
                return "F";
            }
            return "OK";

        }else if(type.equals("D")){
            try{
                ts.delete(Long.parseLong(rq.getParameter("id")));
            }catch (Exception e){
                e.printStackTrace();
                return "F";
            }
            return "OK";
        }


        return "F";
    }

}

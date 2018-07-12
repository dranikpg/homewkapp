package com.dranikpg.homewkapp.service;

import com.dranikpg.homewkapp.dto.TaskLRestDTO;
import com.dranikpg.homewkapp.entity.Task;
import com.dranikpg.homewkapp.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service("cm")
public class CacheManager {

    @Lazy
    @Autowired
    UserService us;

    @Lazy
    @Autowired
    TaskService ts;

    @Lazy
    @Autowired
    TimeService tms;

    //task

    HashMap<Integer, HashMap<String, ArrayList<TaskLRestDTO>>> taskM;

    protected void rebuildTaskM() {

        long st = System.currentTimeMillis();
        System.out.println("Rebuilding task map");

        List<Task> tl = ts.fpending();

        taskM = new HashMap<>();

        for (Task t : tl) {

            if(t.getUser() == null) continue;

            if (!taskM.containsKey(t.expd)) taskM.put(t.expd, new HashMap<>());

            TaskLRestDTO d = new TaskLRestDTO();
            d.id = t.id;
            d.creator_id = t.getUser().id;
            d.creator_name = t.getUser().name;
            d.title = t.title;

            if (!taskM.get(t.expd).containsKey(t.subj))
                taskM.get(t.expd).put(t.subj, new ArrayList<>());

            taskM.get(t.expd).get(t.subj).add(d);
        }

        System.out.println("Took " + (System.currentTimeMillis() - st));
    }

    public void invalidatePending() {
        taskM = null;
    }

    public HashMap<Integer, HashMap<String, ArrayList<TaskLRestDTO>>> pendingTasks() {
        if (taskM == null) rebuildTaskM();
        return taskM;
    }

}

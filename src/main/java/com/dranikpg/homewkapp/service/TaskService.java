package com.dranikpg.homewkapp.service;

import com.dranikpg.homewkapp.entity.Task;
import com.dranikpg.homewkapp.repo.TaskRepo;
import dint.Dint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("ts")
public class TaskService {

    @Lazy
    @Autowired
    TaskRepo trepo;

    @Lazy
    @Autowired
    UserService us;

    //

    public List<Task> all(){
        return trepo.findAll();
    }


    public List<Task> pending(int d){
        System.out.println("Looking for greater than " + d);
        return trepo.findByExpdGreaterThan(d);
    }

    public List<Task> ofUser(int id){
        return trepo.findByUser(id);
    }

    public List<Task> ofCurrentUser(){
        return ofUser(us.curentUserID());
    }

    public void create(int d, String sub, String title){
        Task t = new Task();
        t.expd = d;
        t.subj = sub;
        t.title = title;
        t.desc = title;
        t.user = us.curentUserID();
        trepo.saveAndFlush(t);
    }

    public void drop() {
        trepo.deleteAll();
        trepo.flush();
    }
}

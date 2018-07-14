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

    @Lazy
    @Autowired
    TimeService tms;

    //

    public List<Task> pending(int d){
        System.out.println("Looking for greater than " + d);
        return trepo.pending(d);
    }

    public List<Task> fpending(){
        return pending(tms.focus());
    }

    //edit

    public void create(int d,String subj,  String desc){
        System.out.println("Create :: " + d + " " + subj + " " + desc);
        Task t = new Task();
        t.expd = d;
        t.desc = desc;
        t.subj = subj;
        t.user = us.currentUser();
        trepo.saveAndFlush(t);
    }

    public void edit(long id, String desc){
        System.out.println("Edit " + id + "  " + desc);
        Task r = trepo.getOne(id);
        if(r.getUser().getId() != us.curentUserID())throw new UnsupportedOperationException();
        if(desc != null)r.setDesc(desc);
        trepo.saveAndFlush(r);
    }

    public void delete(long id){
        System.out.println("Delete " + id);
        Task t = trepo.getOne(id);
        System.out.println(t.getUser());
        if(t.getUser().id == us.curentUserID()) {
            trepo.deleteById(id);
        }else{
            throw new UnsupportedOperationException();
        }
    }

    //dates

    public void newDate(){
        System.out.println("NEW DATE");
    }
}

package com.dranikpg.homewkapp.service;

import com.dranikpg.homewkapp.entity.Task;
import com.dranikpg.homewkapp.entity.User;
import com.dranikpg.homewkapp.repo.TaskRepo;
import org.pmw.tinylog.Logger;
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

    //debug

    private String userinf(){
        User c = us.currentUser();
        if(c == null)return "UNAUTH";
        return c.getNick();
    }

    //edit

    public void create(int d,String subj,  String desc, int tag){
        Logger.debug(userinf() + ": " + d + " " + subj + " " + desc);
        if(us.currentUser() == null) throw new UnsupportedOperationException();
        Task t = new Task();
        t.expd = d;
        t.content = desc;
        t.subj = subj;
        t.user = us.currentUser();
        t.tag = tag;
        t.adminedit = false;
        trepo.saveAndFlush(t);
    }

    public void edit(long id, String desc){
        Logger.debug(userinf() + ": " + id + "  " + desc);
        Task r = trepo.getOne(id);
        if(!us.checkID( r.getUser().getId()) )throw new UnsupportedOperationException();

        //check admin edit
        if(us.curentUserID() != r.getUser().getId()) r.setAdminedit(true);
        else r.setAdminedit(false);

        if(desc != null)r.setContent(desc);
        trepo.saveAndFlush(r);
    }

    public void delete(long id){
        Logger.debug(userinf() + ": " + id);
        Task t = trepo.getOne(id);
        System.out.println(t.getUser());
        if(us.checkID(t.getUser().getId())) {
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

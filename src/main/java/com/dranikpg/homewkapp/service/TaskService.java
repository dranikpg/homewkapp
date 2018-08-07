package com.dranikpg.homewkapp.service;

import com.dranikpg.homewkapp.dto.TaskRDTO;
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

    public List<Task> all(){
        return trepo.findAll();
    }

    public List<Task> pending(int d){
        System.out.println("Looking for greater than " + d);
        return trepo.pending(d);
    }

    public List<Task> fpending(){
        return pending(tms.focus());
    }

    public List<Task> ofUser(User u){
        return trepo.findByUser(u.getId());
    }

    //debug

    private String userinf(){
        User c = us.currentUser();
        if(c == null)return "UNAUTH";
        return c.getNick();
    }

    //edit

    public void deleteOfUser(User u){
        Logger.info("DELETING ALL TASKS OF " + u + " WITH PERMISSION OF " + userinf());
        trepo.deleteByUser(u.getId());
        trepo.flush();
    }

    public void create(TaskRDTO d){
        Logger.debug(userinf() + ": " + d.date + " " + d.subj + " " + d.desc);
        if(us.currentUser() == null) throw new UnsupportedOperationException();
        Task t = new Task();
        t.expd = d.date;
        t.content = d.desc;
        t.subj = d.subj;
        t.user = us.currentUser();
        t.tag = d.tag;
        t.adminedit = false;
        trepo.saveAndFlush(t);
    }

    public void edit(TaskRDTO d){
        Logger.debug(userinf() + ": " + d.id + "  " + d.desc);
        Task r = trepo.getOne(d.id);
        if(!us.checkID( r.getUser().getId()) )throw new UnsupportedOperationException();

        //check admin edit
        if(us.curentUserID() != r.getUser().getId()) r.setAdminedit(true);
        else r.setAdminedit(false);

        if(d.desc != null)r.setContent(d.desc);
        if(d.tag != -1)r.setTag(d.tag);
        //

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

}

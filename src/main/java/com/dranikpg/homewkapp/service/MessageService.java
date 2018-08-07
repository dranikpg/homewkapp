package com.dranikpg.homewkapp.service;

import com.dranikpg.homewkapp.entity.Message;
import com.dranikpg.homewkapp.repo.MessageRepo;
import org.pmw.tinylog.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    @Lazy
    @Autowired
    UserService us;

    @Lazy
    @Autowired
    MessageRepo rp;

    public List<Message> getAll(){
        return rp.findAll();
    }

    public void drop(){
        Logger.info("ALL MESSAGE DELETE");
        rp.deleteAll();
    }

    public Message get(int id){
        return rp.getOne((long) id);
    }

    public void delete(long id){
        Logger.debug(us.currentUserNick() + " " + id);
        rp.deleteById(id);
    }

    public void create(String desc){
        Logger.debug(us.currentUserNick()  + " " + desc);
        Message m = new Message();
        m.content = desc;
        rp.saveAndFlush(m);
    }


}

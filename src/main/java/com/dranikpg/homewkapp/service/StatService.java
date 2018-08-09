package com.dranikpg.homewkapp.service;

import com.dranikpg.homewkapp.entity.Task;
import com.dranikpg.homewkapp.stat.handler.UserStatHandler;
import com.dranikpg.homewkapp.stat.i.StatBag;
import com.dranikpg.homewkapp.stat.i.StatHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

@Service
public class StatService {

    @Autowired
    TaskService ts;

    List<StatHandler> handler;

    HashMap<String, List<? extends StatBag>> data;

    public StatService() {
        handler = Arrays.asList(new UserStatHandler());
        data = new HashMap<>();
    }

    public HashMap<String, List<? extends StatBag>> get(){
        return data;
    }

    public synchronized void update(){
        process();
    }

    private void process(){
        new Thread(this::_run).start();
    }

    private void _run(){
        Thread.currentThread().setName("STAT PROCESS");

        List<Task> tasks = ts.all();

        for(StatHandler hd:handler){
            hd.refresh();
        }

        for(Task t :tasks)
            for(StatHandler hd : handler)
                hd.process(t);

        data.clear();
        for(StatHandler hd: handler){
            data.put(hd.name(),hd.get());
        }

    }



}

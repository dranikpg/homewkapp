package com.dranikpg.homewkapp.service;

import dint.Dint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Timer;
import java.util.TimerTask;

@Service("tms")
public class TimeService {

    Timer shd;

    @Lazy
    @Autowired
    TaskService ts;

    public volatile int focus = Dint.create(2018,06,13);

    public TimeService() {
        shd = new Timer();
        setup();
    }

    public int focus(){
        System.out.println("FOCUS");
        return focus;
    }

    private void setup(){
       /* shd.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                next();
            }
        }, 10000L, 10000L);*/
    }

    private int dayOFW(int d){
        Calendar c = Calendar.getInstance();
        c.setTime(Dint.toDate(d));
        int dy =  c.get(Calendar.DAY_OF_WEEK);
        if(dy == 1)return 7;
        else return dy-2;
    }

    private void next(){
        focus = Dint.addDays(focus,1);
        while (dayOFW(focus) > 4) focus = Dint.addDays(focus,1);
        System.out.println("NEW FOCUS " + focus);
        ts.newDate();
    }


}

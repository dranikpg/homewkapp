package com.dranikpg.homewkapp.service;

import dint.Dint;
import org.pmw.tinylog.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Timer;

@Service("tms")
public class TimeService {

    Timer shd;

    @Lazy
    @Autowired
    TaskService ts;

    public volatile int focus = Dint.create(2018,07,13);

    public TimeService() {
        shd = new Timer();
        setup();
    }

    public int focus(){
        return focus;
    }

    private void setup(){
        /*shd.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                next();
            }
        }, 1000, 10000L);*/
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
        Logger.debug("Focus " + focus);
        ts.newDate();
    }


}

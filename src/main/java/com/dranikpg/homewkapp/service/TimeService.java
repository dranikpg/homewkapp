package com.dranikpg.homewkapp.service;

import dint.Dint;
import org.joda.time.DateTime;
import org.joda.time.DateTimeConstants;
import org.pmw.tinylog.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Timer;

@Service("tms")
public class TimeService {

    @Value("${hw.daytime}")
    public int timeb = 15;

    public int focus(){
        DateTime t = new DateTime();
        int hof = t.getHourOfDay();
        if(hof >= timeb){
            t = t.plusDays(1);
        }
        int tof = t.getDayOfWeek();
        if(tof > DateTimeConstants.FRIDAY){
            t = t.plusDays(1+(DateTimeConstants.SUNDAY-tof));
        }
        return Dint.create(t.getYear(), t.getMonthOfYear(), t.getDayOfMonth());
    }

}

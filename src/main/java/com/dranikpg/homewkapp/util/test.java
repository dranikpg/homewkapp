package com.dranikpg.homewkapp.util;

import dint.Dint;

import java.util.Calendar;

public class test {

    public static void main(String[] args) {
        Calendar c = Calendar.getInstance();
        c.setTime(Dint.toDate(Dint.compose(2018,6,17)));
        int dayOfWeek = c.get(Calendar.DAY_OF_WEEK);
        System.out.println(dayOfWeek);
    }

}

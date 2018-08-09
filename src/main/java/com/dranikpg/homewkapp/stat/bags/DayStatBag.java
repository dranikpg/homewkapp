package com.dranikpg.homewkapp.stat.bags;

import com.dranikpg.homewkapp.stat.i.StatBag;

public class DayStatBag implements StatBag {
    public DayStatBag(String date) {
        this.date = date;
        this.value = 1;
    }

    public String date;
    public int value = 0;
}

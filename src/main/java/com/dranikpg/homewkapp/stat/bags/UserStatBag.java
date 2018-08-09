package com.dranikpg.homewkapp.stat.bags;

import com.dranikpg.homewkapp.stat.i.StatBag;

public class UserStatBag implements StatBag {

    public UserStatBag(String name) {
        this.name = name;
    }

    public String name;
    public int val;
}

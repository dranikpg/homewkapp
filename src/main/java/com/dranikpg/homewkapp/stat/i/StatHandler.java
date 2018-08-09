package com.dranikpg.homewkapp.stat.i;

import com.dranikpg.homewkapp.entity.Task;

import java.util.List;

public interface StatHandler {
    String name();
    void process(Task t);
    List<? extends StatBag> get();
    void refresh();
}

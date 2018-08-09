package com.dranikpg.homewkapp.stat.handler;

import com.dranikpg.homewkapp.entity.Task;
import com.dranikpg.homewkapp.stat.bags.UserStatBag;
import com.dranikpg.homewkapp.stat.i.StatBag;
import com.dranikpg.homewkapp.stat.i.StatHandler;

import java.util.Arrays;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;

public class UserStatHandler implements StatHandler {

    HashMap<Integer, UserStatBag> map;

    public UserStatHandler() {
        map = new HashMap<>();
    }

    @Override
    public String name() {
        return "usercd";
    }

    @Override
    public void process(Task t) {
        if(!t.isUserCredit())return;

        if(!map.containsKey(t.getUser().getId())){
            map.put(t.getUser().getId(), new UserStatBag(t.getUser().getName()));
        }
        map.get(t.getUser().getId()).val++;
    }

    @Override
    public List<? extends StatBag> get() {
        List<UserStatBag> bg = Arrays.<UserStatBag>asList(map.values().toArray(new UserStatBag[0]));
        bg.sort(Comparator.comparingInt(o -> -  o.val));
        return bg;
    }

    @Override
    public void refresh() {
        map.clear();
    }
}

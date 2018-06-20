package com.dranikpg.homewkapp.util;

import java.util.List;

public class SubjectTable {
    public List<String> monday;
    public List<String> tuesday;
    public List<String> wednesday;
    public List<String> thursday;
    public List<String> friday;

    public List<String> get(int i){
        switch (i){
            case 0:return monday;
            case 1:return tuesday;
            case 2:return wednesday;
            case 3:return thursday;
            case 4:return friday;
        }
        return null;
    }
}

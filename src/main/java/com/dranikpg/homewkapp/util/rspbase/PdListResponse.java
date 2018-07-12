package com.dranikpg.homewkapp.util.rspbase;

import com.dranikpg.homewkapp.dto.TaskLRestDTO;

import java.util.ArrayList;
import java.util.HashMap;

public class PdListResponse extends Response{
    public PdListResponse(int user,  HashMap<Integer, HashMap<String, ArrayList<TaskLRestDTO>>> data) {
        super(user);
        this.data = data;
    }
    public HashMap<Integer, HashMap<String, ArrayList<TaskLRestDTO>>> data;
}

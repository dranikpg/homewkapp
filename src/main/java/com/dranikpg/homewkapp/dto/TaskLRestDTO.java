package com.dranikpg.homewkapp.dto;

import com.dranikpg.homewkapp.entity.Task;

public class TaskLRestDTO {
    public TaskLRestDTO(Task t){
        this.id = (int)t.id;
        this.creator_id = t.getUser().id;
        this.creator_name = t.getUser().name;
        this.desc = t.desc;
        this.date = t.expd;
        this.subj = t.subj;
    }
    public int id;
    public int creator_id;
    public int date;
    public String creator_name;
    public String desc;
    public String subj;
}

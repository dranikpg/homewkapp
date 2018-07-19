package com.dranikpg.homewkapp.dto;

import com.dranikpg.homewkapp.entity.Task;

public class TaskDTO {
    public TaskDTO(Task t){
        this.id = (int)t.id;
        this.creator_id = t.getUser().id;
        this.creator_name = t.getUser().name;
        this.desc = t.getContent();
        this.date = t.getExpd();
        this.subj = t.getSubj();
        this.tag = t.getTag();
        this.adedit = t.isAdminedit();
    }
    public int id;
    public int creator_id;
    public int date;
    public int tag;
    public boolean adedit;
    public String creator_name;
    public String desc;
    public String subj;
}

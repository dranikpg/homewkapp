package com.dranikpg.homewkapp.dto;

public class TaskRDTO {
    public String type;
    public long id;
    public int date;
    public String desc;
    public String subj;
    public int tag = -1;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getDate() {
        return date;
    }

    public void setDate(int date) {
        this.date = date;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public String getSubj() {
        return subj;
    }

    public void setSubj(String subj) {
        this.subj = subj;
    }

    public int getTag() {
        return tag;
    }

    public void setTag(int tag) {
        this.tag = tag;
    }

    @Override
    public String toString() {
        return "TaskRDTO{" +
                "id=" + id +
                ", date=" + date +
                ", desc='" + desc + '\'' +
                ", subj='" + subj + '\'' +
                ", tag=" + tag +
                '}';
    }
}

package com.dranikpg.homewkapp.entity;

import javax.persistence.*;

@Entity
@Table(name = "tasks")
public class Task {

    //org

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    public long id;


    @ManyToOne(fetch = FetchType.EAGER)
    public User user;

    //date

    @Column(name = "subj")
    public String subj;

    @Column(name = "expd")
    public int expd;

    //tings

    @Column(name = "desc")
    public String desc;

    @Column(name = "tag")
    public int tag;

    //


    // garbage

    public long getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getSubj() {
        return subj;
    }

    public void setSubj(String subj) {
        this.subj = subj;
    }

    public int getExpd() {
        return expd;
    }

    public void setExpd(int expd) {
        this.expd = expd;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public int getTag() {
        return tag;
    }

    public void setTag(int tag) {
        this.tag = tag;
    }

    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", user=" + user +
                ", subj='" + subj + '\'' +
                ", expd=" + expd +
                ", desc='" + desc + '\'' +
                '}';
    }
}

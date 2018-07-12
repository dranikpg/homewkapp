package com.dranikpg.homewkapp.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "tasks")
public class Task {

    //org

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    public int id;


    @ManyToOne(fetch = FetchType.EAGER)
    public User user;

    //date

    @Column(name = "subj")
    public String subj;

    @Column(name = "expd")
    public int expd;

    //tings

    @Column(name = "title")
    public String title;

    @Column(name = "desc")
    public String desc;

    //


    // garbage

    public int getId() {
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }


}

package com.dranikpg.homewkapp.entity;


import javax.persistence.*;

@Entity
@Table(name="msg")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    public long id;

    @Column(name="content",columnDefinition="TEXT")
    public String content;


    public long getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}

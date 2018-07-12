package com.dranikpg.homewkapp.dto;

import com.dranikpg.homewkapp.entity.User;

public class UserDTO {
    public UserDTO(User u){
        this.id = u.id;
        this.nick = u.nick;
        this.name = u.name;
    }
    public int id;
    public String nick;
    public String name;

}

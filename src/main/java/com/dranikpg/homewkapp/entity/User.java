package com.dranikpg.homewkapp.entity;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "user")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    public int id;

    @Column(name = "nick",nullable = false, unique = true)
    public String nick;

    @Column(name = "name",nullable = false, unique = true)
    public String name;

    @Column(name = "ac_lock")
    public boolean locked = false;

    @Column(name = "admin")
    public boolean admin = false;

    private String password;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNick() {
        return nick;
    }

    public void setNick(String nick) {
        this.nick = nick;
    }

    public String getName() {
        return name;
    }

    public void setName(String rname) {
        this.name = rname;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isLocked() {
        return locked;
    }

    public void setLocked(boolean locked) {
        this.locked = locked;
    }

    public boolean isAdmin() {
        return admin;
    }

    //

    @Transient
    private List<GrantedAuthority> gtl;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if(gtl != null)return gtl;
        if(admin) gtl = Arrays.asList(
                new SimpleGrantedAuthority("ROLE_USER"),
                new SimpleGrantedAuthority("ROLE_ADMIN")
        );
        else gtl = Arrays.asList(new SimpleGrantedAuthority("ROLE_USER"));
        return gtl;
    }

    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return nick;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", nick='" + nick + '\'' +
                ", name='" + name + '\'' +
                ", locked=" + locked +
                ", password='" + password + '\'' +
                ", gtl=" + gtl +
                '}';
    }
}

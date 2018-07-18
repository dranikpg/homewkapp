package com.dranikpg.homewkapp.entity;

import com.dranikpg.homewkapp.util.Const;
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

    //



    //

    @Transient
    private List<GrantedAuthority> gtl;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if(gtl != null)return gtl;
        if(nick.equals(Const.VLAD_NICK)) gtl = Arrays.asList(
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
        return true;
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
                ", password='" + password + '\'' +
                '}';
    }
}

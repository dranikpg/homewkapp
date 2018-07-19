package com.dranikpg.homewkapp.service;

import com.dranikpg.homewkapp.entity.User;
import com.dranikpg.homewkapp.repo.UserRepo;
import org.pmw.tinylog.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("us")
public class UserService implements UserDetailsService  {

    @Lazy
    @Autowired
    UserRepo ur;


    //get

    public User currentUser(){
        Authentication at = SecurityContextHolder.getContext().getAuthentication();
        if(at == null || at.getPrincipal() == null || !(at.getPrincipal() instanceof User))return null;
        User u = (User) at.getPrincipal();
        return u;
    }

    public int curentUserID(){
        User u = currentUser();
        return u == null ? -1 : u.getId();
    }

    public boolean currentUserBlocked(){
        return currentUser().isLocked();
    }

    public boolean checkID(int id){
        return id==curentUserID() || currentUser().isAdmin();
    }


    // gets

    public User get(int id){
        return ur.findById(id);
    }

    public List<User> all(){
        return ur.findAll();
    }

    public List<User> searchNick(String nick){
        return ur.findByNick(nick);
    }

    //lock

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Logger.debug("User request " + username);
        List<User> l = ur.findByNick(username);
        if(l.size() == 0)throw new UsernameNotFoundException("NOT FOUND");
        else return l.get(0);
    }


}

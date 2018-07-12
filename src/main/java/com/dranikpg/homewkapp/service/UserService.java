package com.dranikpg.homewkapp.service;

import com.dranikpg.homewkapp.entity.User;
import com.dranikpg.homewkapp.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("us")
public class UserService implements UserDetailsService  {

    @Lazy
    @Autowired
    UserRepo ur;

    @Lazy
    @Autowired
    CacheManager cm;

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

    public boolean checkID(int id){
        return id==curentUserID();
    }

    public User get(int id){
        return ur.findById(id);
    }

    public List<User> all(){
        return ur.findAll();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("Search " + username);
        return ur.findByNick(username).get(0);
    }
}

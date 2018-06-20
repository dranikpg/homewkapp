package com.dranikpg.homewkapp.service;

import com.dranikpg.homewkapp.entity.User;
import com.dranikpg.homewkapp.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService  {

    private UserRepo repo;

    @Autowired
    public UserService(UserRepo userRepository) {
        this.repo = userRepository;
    }

    public void saveUser(User user) {
        repo.save(user);
    }

    @Autowired
    PasswordEncoder enc;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = repo.findByNick(username);

        if(user == null){
            user = new User();
            user.nick = username;
            user.setPassword(enc.encode("lol"));
        }

        return user;

    }
}

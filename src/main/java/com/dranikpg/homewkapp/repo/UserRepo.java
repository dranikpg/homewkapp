package com.dranikpg.homewkapp.repo;

import com.dranikpg.homewkapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("urepo")
public interface UserRepo extends JpaRepository<User, Long> {

    public List<User> findByNick(String nick);

    public User findById(int id);

}
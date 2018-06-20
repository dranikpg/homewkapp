package com.dranikpg.homewkapp.repo;

import com.dranikpg.homewkapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository("userrepo")
public interface UserRepo extends JpaRepository<User, Long> {

    public User findByNick(String nick);

}
package com.dranikpg.homewkapp.repo;

import com.dranikpg.homewkapp.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("trepo")
public interface TaskRepo extends JpaRepository<Task,Long> {

    public List<Task> findByUser(int user);

    public List<Task> findByExpdGreaterThan(int date);
}

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

    public void deleteByUser(int user);

    @Query("SELECT t FROM Task t WHERE t.expd >= :date")
    public List<Task> pending(@Param("date") int date);
}

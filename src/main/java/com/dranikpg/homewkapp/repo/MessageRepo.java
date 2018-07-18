package com.dranikpg.homewkapp.repo;

import com.dranikpg.homewkapp.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepo extends JpaRepository<Message, Long> {
}

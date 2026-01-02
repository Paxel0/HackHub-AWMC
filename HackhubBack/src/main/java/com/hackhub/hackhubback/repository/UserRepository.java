package com.hackhub.hackhubback.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.hackhub.hackhubback.entity.User;

public interface UserRepository {
    User findByUsername(String username);
}

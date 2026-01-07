package com.hackhub.hackhubback.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hackhub.hackhubback.entity.User;
import com.hackhub.hackhubback.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User findIdByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }
    
}

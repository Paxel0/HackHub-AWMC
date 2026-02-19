package com.hackhub.hackhubback;


import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.hackhub.hackhubback.entity.User;
import com.hackhub.hackhubback.repository.UserRepository;






@SpringBootApplication
public class HackhubBackApplication {

	public static void main(String[] args) {
		SpringApplication.run(HackhubBackApplication.class, args);
	}

}


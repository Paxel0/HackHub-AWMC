package com.hackhub.hackhubback.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api")
public class HomeController {

    @GetMapping("/home")
    public String home(){
        return "Benvenuto in HackHub!";
    }
 }
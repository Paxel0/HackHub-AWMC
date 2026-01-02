package com.hackhub.hackhubback.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class HomeController {

    @GetMapping("/hackhub")
    public String home(){
        return "Benvenuto in HackHub!";
    }
 }


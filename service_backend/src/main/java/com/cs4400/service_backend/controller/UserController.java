package com.cs4400.service_backend.controller;

import com.cs4400.service_backend.entity.Account;
import com.cs4400.service_backend.service.Login;
import com.cs4400.service_backend.service.RegisterUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private RegisterUser registerUser;

    @Autowired
    private Login login;

    @GetMapping(value = "/hello")
    public List<Account> demo() {
        List<Account> result = registerUser.getAllAccounts();
        System.out.println(result);
        return result;
    }

    @PostMapping(value = "/login")
    public ResponseEntity<String> registerAccount(@RequestParam String email, @RequestParam String passwd) {

        if (login.login(email, passwd)) {
            return ResponseEntity.status(HttpStatus.OK).body("Success!");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Input Invalid!");
        }

    }
}

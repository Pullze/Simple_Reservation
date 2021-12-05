package com.cs4400.service_backend.controller;

import com.cs4400.service_backend.entity.Account;
import com.cs4400.service_backend.service.RegisterUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

@RestController
public class UserController {

    @Autowired
    private RegisterUser registerUser;

    @GetMapping(value = "/hello")
    public List<Account> demo() {
        List<Account> result = registerUser.getAllAccounts();
        System.out.println(result);
        return result;
    }
}

package com.cs4400.service_backend.controller;

import com.cs4400.service_backend.entity.Account;
import com.cs4400.service_backend.entity.Customer;
import com.cs4400.service_backend.entity.Owner;
import com.cs4400.service_backend.service.Login;
import com.cs4400.service_backend.service.RegisterUser;
import com.cs4400.service_backend.vo.LoginInfo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Api(tags = "User Controller")
@RestController
public class UserController {

    @Autowired
    private RegisterUser registerUser;

    @Autowired
    private Login login;

    /**
     * Get all accounts from the database.
     * @return A list of Accounts.
     */
    @GetMapping(value = "/hello")
    @ApiOperation(value = "Get all Accounts", notes = "Get all accounts.")
    public List<Account> demo() {
        List<Account> result = registerUser.getAllAccounts();
        System.out.println(result);
        return result;
    }

    /**
     * Validate login info.
     * @param email User's email.
     * @param passwd User's password.
     * @return LoginInfo indicate success or not, and the user's type.
     */
    @PostMapping(value = "/login")
    @ApiOperation(value = "Validate login info", notes = "Validate login info (unsafe)")
//    public ResponseEntity<String> registerAccount(@RequestParam String email, @RequestParam String passwd) {
//        if (login.login(email, passwd)) {
//            return ResponseEntity.status(HttpStatus.OK).body("Success!");
//        } else {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Input Invalid!");
//        }
//    }
    public LoginInfo registerAccount(@RequestParam String email, @RequestParam String passwd) {

        return login.login(email, passwd);

    }

    @PostMapping(value = "/register_owner")
    @ApiOperation(value = "regsiter_owner", notes = "Validate login info")
    public ResponseEntity<String> register_owner(@Valid Owner owner) {
        String message = registerUser.register_owner(owner);
        if (message == "Register succeeded!") {
            return ResponseEntity.status(HttpStatus.OK).body(message);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
        }

    }

    @PostMapping(value = "/register_customer")
    @ApiOperation(value = "regsiter_customer", notes = "Validate login info")
    public ResponseEntity<String> register_customer(@Valid Customer customer) {
        String message = registerUser.register_customer(customer);
        if (message == "Register succeeded!") {
            return ResponseEntity.status(HttpStatus.OK).body(message);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
        }

    }


}


package com.cs4400.service_backend.controller;

import com.cs4400.service_backend.entity.Account;
import com.cs4400.service_backend.service.Login;
import com.cs4400.service_backend.service.RegisterUser;
import com.cs4400.service_backend.vo.LoginInfo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

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
    /**
     *
     * @param owner_email owner's mail
     * @param owner_first_name dd
     * @param owner_last_name d
     * @param password d
     * @param phone_number d
     * @return d
     */
    @PostMapping(value = "/register_owner")
    @ApiOperation(value = "regsiter_owner", notes = "Validate login info (unsafe)")
    public ResponseEntity<String> register_owner(@RequestParam String owner_email,@RequestParam String owner_first_name,@RequestParam String owner_last_name,@RequestParam String password,@RequestParam String phone_number) {
        if (registerUser.register_owner(owner_email,owner_first_name,owner_last_name,password,phone_number) == 0) {
            return ResponseEntity.status(HttpStatus.OK).body("Success!");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The owner already exists.");
        }
    }


}


package com.cs4400.service_backend.controller;

import com.cs4400.service_backend.entity.Account;
import com.cs4400.service_backend.service.Login;
import com.cs4400.service_backend.service.RegisterUser;
import com.cs4400.service_backend.vo.LoginInfo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Date;
import java.util.List;
import java.util.Map;

@Api(tags = "User Controller")
@RestController
@Slf4j
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
    @GetMapping(value = "/login")
    @ApiOperation(value = "Validate login info", notes = "Validate login info (unsafe)")

    public LoginInfo registerAccount(@RequestParam(required = false) String email, @RequestParam(required = false) String passwd) {

        log.info(email);
        log.info(passwd);
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

    /**
     *
     * @param customer_email t
     * @param customer_first_name t
     * @param customer_last_name t
     * @param password t
     * @param phone_number t
     * @param cc_number t
     * @param cvv t
     * @param exp_date t
     * @param location t
     * @return
     */
    @PostMapping(value = "/register_customer")
    @ApiOperation(value = "regsiter_customer", notes = "Validate login info (unsafe)")
    public ResponseEntity<String> register_customer(@RequestParam String customer_email, @RequestParam String customer_first_name, @RequestParam String customer_last_name, @RequestParam String password, @RequestParam String phone_number,@RequestParam String cc_number,@RequestParam String cvv,@RequestParam Date exp_date,@RequestParam String location) {
        if (registerUser.register_customer(customer_email,customer_first_name,customer_last_name,password,phone_number,cc_number, cvv, exp_date, location) == 0) {
            return ResponseEntity.status(HttpStatus.OK).body("Success!");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Input Invalid!");
        }
    }


}


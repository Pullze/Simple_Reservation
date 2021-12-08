package com.cs4400.service_backend.controller;

import com.cs4400.service_backend.entity.Account;
import com.cs4400.service_backend.entity.Customer;
import com.cs4400.service_backend.entity.Owner;
import com.cs4400.service_backend.service.Login;
import com.cs4400.service_backend.service.UserProcess;
import com.cs4400.service_backend.vo.CustomerInfo;
import com.cs4400.service_backend.vo.LoginInfo;
import com.cs4400.service_backend.vo.OwnerInfo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;



@Api(tags = "User Controller")
@RestController
@Slf4j
public class UserController {

    @Autowired
    private UserProcess userProcess;

    @Autowired
    private Login login;

    /**
     * Get all accounts from the database.
     * @return A list of Accounts.
     */
    @GetMapping(value = "/hello")
    @ApiOperation(value = "Get all accounts", notes = "Get all accounts.")
    public List<Account> demo() {

        List<Account> result = userProcess.getAllAccounts();
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

    public LoginInfo login(@RequestParam(required = false) String email, @RequestParam(required = false) String passwd) {

        return login.login(email, passwd);

    }

    /**
     * Register owner.
     * @param owner the owner object.
     * @return Response indicate success or not.
     */
    @PostMapping(value = "/register_owner")
    @ApiOperation(value = "Register owner", notes = "Register a new owner")
    public ResponseEntity<String> register_owner(@RequestPart("jsonValue") @Valid Owner owner) {

        String message = userProcess.register_owner(owner);
        if (message.equals("Register succeeded!")) {
            return ResponseEntity.status(HttpStatus.OK).body(message);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
        }

    }

    /**
     * Register customer.
     * @param customer the customer object.
     * @return Response indicate success or not.
     */
    @PostMapping(value = "/register_customer")
    @ApiOperation(value = "Register customer", notes = "Register a new customer")
    public ResponseEntity<String> register_customer(@RequestPart("jsonValue") @Valid Customer customer) {

        String message = userProcess.register_customer(customer);
        if (message.equals("Register succeeded!")) {
            return ResponseEntity.status(HttpStatus.OK).body(message);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
        }

    }

    /**
     * Get all customers. (Admin)
     * @return a list of all Customers.
     */
    @GetMapping(value = "/get_customer")
    @ApiOperation(value = "Get all customers", notes = "Get all customers")
    public List<CustomerInfo> getCustomersInfo() {

        return userProcess.getCustomerInfo();

    }

    @GetMapping(value = "/get_owner")
    @ApiOperation(value = "Get all owners", notes = "Get all owners")
    public List<OwnerInfo> getOwnerInfo() {

        return userProcess.getOwnerInfo();

    }

}


package com.cs4400.service_backend.controller;

import com.cs4400.service_backend.entity.Account;
import com.cs4400.service_backend.entity.Customer;
import com.cs4400.service_backend.entity.Owner;
import com.cs4400.service_backend.entity.Response;
import com.cs4400.service_backend.service.Login;
import com.cs4400.service_backend.service.UserProcess;
import com.cs4400.service_backend.vo.ViewCustomerInfo;
import com.cs4400.service_backend.vo.ViewOwnerInfo;
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

    public Response<?> login(@RequestParam(required = false) String email, @RequestParam(required = false) String passwd) {

        return new Response<>(HttpStatus.OK.value(), "", login.login(email, passwd));

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
     * @return a list of all CustomerInfo.
     */
    @GetMapping(value = "/view_customer")
    @ApiOperation(value = "Get all customers (admin)", notes = "Get all customers")
    public Response<?> getCustomersInfo() {

        List<ViewCustomerInfo> result = userProcess.getCustomerInfo();
        return new Response<>(HttpStatus.OK.value(), "Success", result);

    }

    /**
     * Get all owners. (Admin)
     * @return a list of all OwnerInfo.
     */
    @GetMapping(value = "/view_owner")
    @ApiOperation(value = "Get all owners (admin)", notes = "Get all owners")
    public Response<?> getOwnerInfo() {

        List<ViewOwnerInfo> result = userProcess.getOwnerInfo();
        return new Response<>(HttpStatus.OK.value(), "Success", result);

    }

    /**
     * Admin process date.
     * @param currentDate current date.
     * @return response indicate success or not, and #datas affected.
     */
    @GetMapping(value = "/process_date")
    @ApiOperation(value = "Admin process date", notes = "Admin process date")
    public Response<?> processDate(@RequestParam String currentDate) {

        int response = userProcess.processDate(currentDate);

        if (response >= 0) { //Success
            String msg = String.format("Success! There are %d changes to the database.", response);
            return new Response<>(HttpStatus.OK.value(), msg);
        } else {
            String msg = String.format("Query Failed, Check your input format. Error status %d", response);
            return new Response<>(HttpStatus.BAD_REQUEST.value(), msg);
        }

    }

    /**
     * Delete owner account from the system.
     * @param email the owen Email.
     * @return response indicate success or not.
     */
    @DeleteMapping(value = "/delete_owner")
    @ApiOperation(value = "Delete Owner", notes = "Owner delete account.")
    public Response<?> deleteOwner(@RequestParam String email) {

        int response = userProcess.deleteOwner(email);

        if (response >= 0) { //Success
            String msg = String.format("Success! There are %d related deletion.", response);
            return new Response<>(HttpStatus.OK.value(), msg);
        } else if (response == -1) {
            String msg = String.format("Your account has already been deleted. " +
                    "Error status %d", response);
            return new Response<>(HttpStatus.BAD_REQUEST.value(), msg);
        } else {
            String msg = String.format("Please remove all properties before delete. " +
                    "Error status %d", response);
            return new Response<>(HttpStatus.FORBIDDEN.value(), msg);
        }

    }

}


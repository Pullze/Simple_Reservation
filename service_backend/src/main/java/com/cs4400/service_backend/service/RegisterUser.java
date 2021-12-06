package com.cs4400.service_backend.service;

import com.cs4400.service_backend.entity.Account;

import java.sql.Date;
import java.util.List;

public interface RegisterUser {

    List<Account> getAllAccounts();

    int register_owner(String owner_email, String owner_first_name, String owner_last_name, String password, String phone_number);

    int register_customer(String customer_email, String customer_first_name, String customer_last_name, String password, String phone_number, String cc_number, String cvv, Date exp_date, String location);


}

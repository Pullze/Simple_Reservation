package com.cs4400.service_backend.service;

import com.cs4400.service_backend.entity.Account;
import com.cs4400.service_backend.entity.Customer;
import com.cs4400.service_backend.entity.Owner;

import java.sql.Date;
import java.util.List;

public interface RegisterUser {

    List<Account> getAllAccounts();

    String register_owner(Owner owner);

    String register_customer(Customer customer);


}

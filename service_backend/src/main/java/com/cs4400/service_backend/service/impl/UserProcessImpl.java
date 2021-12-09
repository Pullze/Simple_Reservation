package com.cs4400.service_backend.service.impl;

import com.cs4400.service_backend.entity.Account;
import com.cs4400.service_backend.entity.Customer;
import com.cs4400.service_backend.entity.Owner;
import com.cs4400.service_backend.mapper.AccountMapper;
import com.cs4400.service_backend.service.UserProcess;
import com.cs4400.service_backend.vo.ViewCustomerInfo;
import com.cs4400.service_backend.vo.ViewOwnerInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.sql.Date;
import java.util.List;

@Slf4j
@Service
public class UserProcessImpl implements UserProcess {

    @Resource
    private AccountMapper accountMapper;

    @Override
    public List<Account> getAllAccounts() {
        return accountMapper.getAllAccounts();
    }

    @Override
    public String register_owner(Owner owner) {
       String owner_email = owner.getEmail();
       String owner_first_name = owner.getFirst_name();
       String owner_last_name = owner.getLast_name();
       String password = owner.getPass();
       String phone_number = owner.getPhone_number();

        //check valid input return 2 as error code if invalid input

        if (accountMapper.check_owner_exist(owner_email) != null) {
            // owner already exist
            return "The owner already exists.";
        }

        if (accountMapper.check_client_exist(owner_email, owner_first_name, owner_last_name, password, phone_number) != null) {
           accountMapper.register_owner(owner_email);
           return "Register succeeded!";
        }

        if (accountMapper.check_account_uniqueness(owner_email, phone_number) == null) {
            accountMapper.register_account(owner_email, owner_first_name, owner_last_name, password);
            accountMapper.register_client(owner_email, phone_number);
            accountMapper.register_owner(owner_email);
            return "Register succeeded!";
        } else {
            return "The email or the phone_number already exists!";
        }
    }

    @Override
    public String register_customer(Customer customer) {
        //check valid input return 2 as error code if invalid input
        String customer_email = customer.getEmail();
        String customer_first_name = customer.getFirst_name();
        String customer_last_name = customer.getLast_name();
        String password = customer.getPass();
        String phone_number = customer.getPhone_number();
        String cc_number = customer.getCcNumber();
        String cvv = customer.getCvv();
        Date exp_date = customer.getExp_date();
        String location = customer.getLocation();

        if (accountMapper.check_customer_exist(customer_email) != null) {

            return "The customer already exists.";
        }

        if (accountMapper.check_cc_number_exist(cc_number) != null) {
            return "The credit card number already exists.";
        }

        if (accountMapper.check_client_exist(customer_email, customer_first_name, customer_last_name, password, phone_number) != null) {
            accountMapper.register_customer(customer_email, cc_number, cvv, exp_date, location);
            return "Register succeeded!";
        }

        if (accountMapper.check_account_uniqueness(customer_email, phone_number) == null) {
            accountMapper.register_account(customer_email, customer_first_name, customer_last_name, password);
            accountMapper.register_client(customer_email, phone_number);
            accountMapper.register_customer(customer_email, cc_number, cvv, exp_date, location);
            return "Register succeeded!";
        } else {
              return  "The email or the phone_number already exists!";
        }

    }

    @Override
    public List<ViewCustomerInfo> getCustomerInfo() {
        return accountMapper.get_customer_info();
    }

    @Override
    public List<ViewOwnerInfo> getOwnerInfo() {
        return accountMapper.get_owner_info();
    }

    @Override
    public Integer processDate(String currentDate) {
        try {
            return accountMapper.process_date(Date.valueOf(currentDate));
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            return -1;
        }
    }

}

package com.cs4400.service_backend.service.impl;

import com.cs4400.service_backend.entity.Account;
import com.cs4400.service_backend.mapper.AccountMapper;
import com.cs4400.service_backend.service.RegisterUser;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.sql.Date;
import java.util.List;

@Service
public class RegisterUserImpl implements RegisterUser {

    @Resource
    private AccountMapper accountMapper;

    @Override
    public List<Account> getAllAccounts() {
        return accountMapper.getAllAccounts();
    }

    @Override
    public int register_owner(String owner_email, String owner_first_name, String owner_last_name, String password, String phone_number) {
        //check valid input return 2 as error code if invalid input

        if (accountMapper.check_owner_exist(owner_email) != null) {
            // owner already exist
            return 1;
        }
        accountMapper.register_owner(owner_email,owner_first_name,owner_last_name,password,phone_number);
        return 0;
    }

    @Override
    public int register_customer(String customer_email, String customer_first_name, String customer_last_name, String password, String phone_number, String cc_number, String cvv, Date exp_date, String location) {
        //check valid input return 2 as error code if invalid input

        if (accountMapper.check_customer_exist(customer_email) != null) {
            // customer already exist
            return 1;
        }
        accountMapper.register_customer(customer_email,customer_first_name,customer_last_name,password,phone_number, cc_number, cvv, exp_date, location);
        return 0;
    }

}

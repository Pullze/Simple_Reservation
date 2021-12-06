package com.cs4400.service_backend.service.impl;

import com.cs4400.service_backend.entity.Account;
import com.cs4400.service_backend.mapper.AccountMapper;
import com.cs4400.service_backend.service.Login;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class LoginImpl implements Login {

    @Resource
    private AccountMapper accountMapper;

    @Override
    public boolean login(String email, String passwd) {
        Account result = accountMapper.login(email, passwd);
        return (result != null);
    }

}

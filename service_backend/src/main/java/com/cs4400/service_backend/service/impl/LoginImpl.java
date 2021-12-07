package com.cs4400.service_backend.service.impl;

import com.cs4400.service_backend.mapper.AccountMapper;
import com.cs4400.service_backend.service.Login;
import com.cs4400.service_backend.vo.LoginInfo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class LoginImpl implements Login {

    @Resource
    private AccountMapper accountMapper;

    @Override
    public LoginInfo login(String email, String passwd) {

        LoginInfo result = accountMapper.login(email, passwd);

        if (result == null) {
            result = new LoginInfo();
            result.setSuccess(false);
        } else {
            result.setSuccess(true);
        }

        return result;

    }

}

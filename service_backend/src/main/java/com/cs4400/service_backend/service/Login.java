package com.cs4400.service_backend.service;

import com.cs4400.service_backend.vo.LoginInfo;

public interface Login {

    LoginInfo login(String email, String passwd);

}

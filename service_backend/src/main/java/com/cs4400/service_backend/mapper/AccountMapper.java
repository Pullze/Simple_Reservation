package com.cs4400.service_backend.mapper;

import com.cs4400.service_backend.entity.Account;
import com.cs4400.service_backend.vo.LoginInfo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface AccountMapper {

   List<Account> getAllAccounts();

   LoginInfo login(String email, String passwd);

}

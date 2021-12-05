package com.cs4400.service_backend.mapper;

import com.cs4400.service_backend.entity.Account;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AccountMapper {

   List<Account> getAllAccounts();

   Account login(String email, String passwd);

}

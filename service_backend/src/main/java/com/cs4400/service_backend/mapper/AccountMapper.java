package com.cs4400.service_backend.mapper;

import com.cs4400.service_backend.entity.Account;
import com.cs4400.service_backend.entity.Owner;
import com.cs4400.service_backend.entity.Customer;
import org.apache.ibatis.annotations.Mapper;

import java.sql.Date;
import java.util.List;

@Mapper
public interface AccountMapper {

   List<Account> getAllAccounts();

   Account login(String email, String passwd);

   void register_owner(String owner_email, String owner_first_name, String owner_last_name, String password, String phone_number);

   void register_customer(String customer_email, String customer_first_name, String customer_last_name, String password, String phone_number, String cc_number, String cvv, Date exp_date, String location);

   Owner check_owner_exist(String owner_email);

   Customer check_customer_exist(String customer_email);


}

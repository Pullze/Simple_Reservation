package com.cs4400.service_backend.mapper;

import com.cs4400.service_backend.entity.Account;
import com.cs4400.service_backend.entity.Client;
import com.cs4400.service_backend.entity.Customer;
import com.cs4400.service_backend.entity.Owner;
import com.cs4400.service_backend.vo.LoginInfo;
import com.cs4400.service_backend.vo.ViewCustomerInfo;
import com.cs4400.service_backend.vo.ViewOwnerInfo;
import org.apache.ibatis.annotations.Mapper;

import java.sql.Date;
import java.util.List;

@Mapper
public interface AccountMapper {

   List<Account> getAllAccounts();

   LoginInfo login(String email, String passwd);

   void register_owner(String owner_email);

   void register_account(String email, String first_name, String last_name, String password);

   void register_client(String email, String phone_number);

   void register_customer(String customer_email,  String cc_number, String cvv, Date exp_date, String location);

   String check_cc_number_exist(String cc_number);

   Owner check_owner_exist(String owner_email);

   Client check_client_exist(String email , String first_name, String last_name, String password, String phone_number);

   Customer check_customer_exist(String customer_email);

   // check if email and phone_number are both unique
   Client check_account_uniqueness(String email, String phone_number);

   List<ViewCustomerInfo> get_customer_info();

   List<ViewOwnerInfo> get_owner_info();

   Integer process_date(Date currentDate);

}

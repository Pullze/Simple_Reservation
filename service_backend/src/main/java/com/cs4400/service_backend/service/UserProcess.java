package com.cs4400.service_backend.service;

import com.cs4400.service_backend.entity.Account;
import com.cs4400.service_backend.entity.Customer;
import com.cs4400.service_backend.entity.Owner;
import com.cs4400.service_backend.vo.ViewCustomerInfo;
import com.cs4400.service_backend.vo.ViewOwnerInfo;

import java.util.List;

public interface UserProcess {

    List<Account> getAllAccounts();

    String register_owner(Owner owner);

    String register_customer(Customer customer);

    List<ViewCustomerInfo> getCustomerInfo();

    List<ViewOwnerInfo> getOwnerInfo();

    Integer processDate(String currentDate);

}

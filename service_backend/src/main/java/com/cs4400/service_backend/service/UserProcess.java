package com.cs4400.service_backend.service;

import com.cs4400.service_backend.entity.Account;
import com.cs4400.service_backend.entity.Customer;
import com.cs4400.service_backend.entity.Owner;
import com.cs4400.service_backend.vo.CustomerInfo;
import com.cs4400.service_backend.vo.OwnerInfo;

import java.util.List;

public interface UserProcess {

    List<Account> getAllAccounts();

    String register_owner(Owner owner);

    String register_customer(Customer customer);

    List<CustomerInfo> getCustomerInfo();

    List<OwnerInfo> getOwnerInfo();
}

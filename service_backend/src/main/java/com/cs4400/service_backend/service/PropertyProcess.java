package com.cs4400.service_backend.service;

import com.cs4400.service_backend.entity.Account;
import com.cs4400.service_backend.entity.Property;

import java.sql.Date;
import java.util.List;

public interface PropertyProcess {

    List<Property> viewProperties(Integer high, Integer low);


    

}

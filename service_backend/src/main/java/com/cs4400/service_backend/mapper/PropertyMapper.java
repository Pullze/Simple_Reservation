package com.cs4400.service_backend.mapper;

import com.cs4400.service_backend.entity.Account;
import com.cs4400.service_backend.entity.Customer;
import com.cs4400.service_backend.entity.Owner;
import com.cs4400.service_backend.entity.Property;
import com.cs4400.service_backend.vo.LoginInfo;
import org.apache.ibatis.annotations.Mapper;

import java.sql.Date;
import java.util.List;

@Mapper
public interface PropertyMapper {

   List<Property> viewProperties(Integer high, Integer low);

   List<String> checkAmenities(String property_name, String property_owner);

   List<Property> viewAvailableProperties(Date start, Date end);

   void reserveProperty(String propertyName, String ownerEmail, String customerEmail, Date startDate, Date endDate, Integer numGuests);
}

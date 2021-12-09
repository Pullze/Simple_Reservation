package com.cs4400.service_backend.mapper;

import com.cs4400.service_backend.entity.*;
import com.cs4400.service_backend.vo.LoginInfo;
import org.apache.ibatis.annotations.Mapper;

import java.sql.Date;
import java.util.List;

@Mapper
public interface PropertyMapper {

   List<Property> viewProperties(Integer high, Integer low);

   List<String> checkAmenities(String property_name, String property_owner);

   List<Property> viewAvailableProperties(Date start, Date end);

   Reserve checkReserveExist(String propertyName, String ownerEmail, String customerEmail);

   Reserve checkReserveCondition(String customerEmail, Date startDate, Date endDate);

   void reserveProperty(String propertyName, String ownerEmail, String customerEmail, Date startDate, Date endDate, Integer numGuests);

}

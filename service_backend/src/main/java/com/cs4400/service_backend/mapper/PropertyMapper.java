package com.cs4400.service_backend.mapper;

import com.cs4400.service_backend.entity.*;
import com.cs4400.service_backend.vo.ReserveInfo;
import org.apache.ibatis.annotations.Mapper;

import java.sql.Date;
import java.util.List;

@Mapper
public interface PropertyMapper {

   List<Property> viewProperties(Integer high, Integer low);

   List<String> checkAmenities(String property_name, String property_owner);

   List<Property> viewAvailableProperties(String start, String end);

   Reserve checkReserveExist(String propertyName, String ownerEmail, String customerEmail);

   List<Reserve> checkReserveCondition(String customerEmail, String startDate, String endDate);

   void reserveProperty(String propertyName, String ownerEmail, String customerEmail, String startDate, String endDate, Integer numGuests);

   List<ReserveInfo> viewCustomerFutureReservations(String customerEmail);

   void cancelPropertytReservation(String propertyName, String ownerEmail, String customerEmail);
}

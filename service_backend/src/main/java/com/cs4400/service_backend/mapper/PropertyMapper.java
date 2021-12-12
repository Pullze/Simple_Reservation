package com.cs4400.service_backend.mapper;

import com.cs4400.service_backend.entity.Property;
import com.cs4400.service_backend.entity.Reserve;
import com.cs4400.service_backend.vo.ReserveInfo;
import org.apache.ibatis.annotations.Mapper;

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

   List<ReserveInfo> viewCustomerPastReservations(String customerEmail);

   List<ReserveInfo> viewOwnersToRate(String customerEmail);

   List<ReserveInfo> viewPropertyReservations();

   Boolean check_owner_has_property(String email);

   void cancelPropertyReservation(String propertyName, String ownerEmail, String customerEmail);

   void reviewReservation(String propertyName, String ownerEmail, String customerEmail, String content, Integer score);

   void rateOwner(String ownerEmail, String customerEmail, Integer score);

}

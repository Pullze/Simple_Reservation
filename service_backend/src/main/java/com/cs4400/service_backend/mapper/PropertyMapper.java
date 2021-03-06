package com.cs4400.service_backend.mapper;

import com.cs4400.service_backend.entity.Property;
import com.cs4400.service_backend.entity.Reserve;
import com.cs4400.service_backend.vo.PropertyInfo;
import com.cs4400.service_backend.vo.ReserveInfo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PropertyMapper {

   List<Property> viewProperties(Integer high, Integer low);

   List<String> checkAmenities(String property_name, String property_owner);

   List<Property> viewAvailableProperties(String start, String end);

   List<Property> viewAllProperties(String ownerEmail);

   Property checkIfReserved(String ownerEmail, String propertyName, String currentDate);

   void removeProperty(String propertyName, String ownerEmail);

   Reserve checkReserveExist(String propertyName, String ownerEmail, String customerEmail);

   List<Reserve> checkReserveCondition(String customerEmail, String startDate, String endDate);

   void reserveProperty(String propertyName, String ownerEmail, String customerEmail, String startDate, String endDate, Integer numGuests);

   List<ReserveInfo> viewCustomerFutureReservations(String customerEmail, String curDate);

   List<ReserveInfo> viewCustomerPastReservations(String customerEmail, String curDate);

   List<ReserveInfo> viewOwnersToRate(String customerEmail, String curDate);

   List<ReserveInfo> viewCustomersToRate(String ownerEmail, String curDate);

   List<ReserveInfo> viewPropertyReservations();

   Boolean check_owner_has_property(String email);

   void cancelPropertyReservation(String propertyName, String ownerEmail, String customerEmail);

   void reviewReservation(String propertyName, String ownerEmail, String customerEmail, String content, Integer score);

   void customerRateOwner(String ownerEmail, String customerEmail, Integer score);

   void ownerRateCustomer(String ownerEmail, String customerEmail, Integer score);

   Property checkAddressExist(PropertyInfo propertyInfo);

   Property checkNameExist(PropertyInfo propertyInfo);

   PropertyInfo checkPropertyExist(String propertyName, String ownerEmail);

   void addProperty(PropertyInfo propertyInfo);

   void addCloseAirport(String propertyName, String ownerEmail, String airportId, int distance);

   void removePropertyFromReserve(String propertyName, String ownerEmail);

   void removePropertyFromReview(String propertyName, String ownerEmail);

   void removePropertyFromAmenity(String propertyName, String ownerEmail);

   void removePropertyFromIsCloseTo(String propertyName, String ownerEmail);



}

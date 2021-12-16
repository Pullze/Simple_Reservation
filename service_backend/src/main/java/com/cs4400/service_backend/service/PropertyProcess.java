package com.cs4400.service_backend.service;

import com.cs4400.service_backend.entity.Property;
import com.cs4400.service_backend.entity.Reserve;
import com.cs4400.service_backend.vo.PropertyInfo;
import com.cs4400.service_backend.vo.ReserveInfo;

import java.util.List;

public interface PropertyProcess {

    List<Property> viewProperties(Integer high, Integer low);

    List<Property> viewAvailableProperties(String start, String end);

    List<Property> viewPropertiesToRemove(String ownerEmail);

    String reserveProperty(Reserve reserve);

    String removeProperty(String propertyName, String ownerEmail, String CurrentDate);

    List<ReserveInfo> viewCustomerFutureReservations(String customerEmail, String curDate);

    List<ReserveInfo> viewCustomerPastReservations(String customerEmail, String curDate);

    List<ReserveInfo> viewReservationsToReview(String customerEmail, String curDate);

    List<ReserveInfo> viewPropertyReservations();

    List<ReserveInfo> viewCustomersToRate(String ownerEmail, String curDate);

    List<ReserveInfo> viewOwnersToRate(String customerEmail, String curDate);

    String cancelPropertyReservation(String propertyName, String ownerEmail, String customerEmail);

    String reviewReservation(String propertyName, String ownerEmail, String customerEmail, String content, Integer score);

    String CustomerRateOwner(String ownerEmail, String customerEmail, Integer score);

    String OwnerRateCustomer(String ownerEmail, String customerEmail, Integer score);

    PropertyInfo addProperty(PropertyInfo propertyInfo);

}

package com.cs4400.service_backend.service;

import com.cs4400.service_backend.entity.Property;
import com.cs4400.service_backend.entity.Reserve;
import com.cs4400.service_backend.vo.PropertyInfo;
import com.cs4400.service_backend.vo.ReserveInfo;

import java.util.List;

public interface PropertyProcess {

    List<Property> viewProperties(Integer high, Integer low);

    List<Property> viewAvailableProperties(String start, String end);

    String reserveProperty(Reserve reserve);

    List<ReserveInfo> viewCustomerFutureReservations(String customerEmail);

    List<ReserveInfo> viewCustomerPastReservations(String customerEmail);

    List<ReserveInfo> viewReservationsToReview(String customerEmail);

    List<ReserveInfo> viewPropertyReservations(String propertyEmail, String ownerEmail);

    List<ReserveInfo> viewOwnersToRate(String customerEmail);

    String cancelPropertyReservation(String propertyName, String ownerEmail, String customerEmail);

    String reviewReservation(String propertyName, String ownerEmail, String customerEmail, String content, Integer score);

    String rateOwner(String ownerEmail, String customerEmail, Integer score);

    PropertyInfo addProperty(Property property);


}

package com.cs4400.service_backend.service.impl;

import com.cs4400.service_backend.entity.Reserve;
import com.cs4400.service_backend.mapper.AirportMapper;
import com.cs4400.service_backend.mapper.PropertyMapper;
import com.cs4400.service_backend.entity.Property;
import com.cs4400.service_backend.entity.Reserve;
import com.cs4400.service_backend.service.PropertyProcess;
import com.cs4400.service_backend.vo.PropertyInfo;
import com.cs4400.service_backend.vo.ReserveInfo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Service
public class PropertyProcessImpl implements PropertyProcess {

    @Resource
    private PropertyMapper propertyMapper;

    @Resource
    private AirportMapper airportMapper;

    @Override
    public List<Property> viewProperties(Integer high, Integer low) {
//        System.out.println(propertyMapper.getAllProperties());

        List<Property> properties = propertyMapper.viewProperties(high, low);
        for(Property property: properties) {
            List<String> amenities = propertyMapper.checkAmenities(property.getProperty_name(), property.getOwner_email());
            property.setAmenities(amenities);
        }
        return properties;
    }

    @Override
    public List<Property> viewAvailableProperties(String start, String end) {
//        System.out.println(propertyMapper.getAllProperties());

        List<Property> properties = propertyMapper.viewAvailableProperties(start, end);
        return properties;
    }

    @Override
    public String reserveProperty(Reserve reserve) {
        String propertyName = reserve.getProperty_name();
        String ownerEmail = reserve.getOwner_email();
        String customerEmail = reserve.getCustomer();
        String startDate = reserve.getStart_date();
        String endDate = reserve.getEnd_date();
        Integer numGuests = reserve.getNum_guests();

        if (startDate.compareTo(endDate) > 0) {
            return "the end date has to after start date";
        }

        Reserve existedReserve = propertyMapper.checkReserveExist(propertyName, ownerEmail, customerEmail);
        if (existedReserve != null) {
            return "Reserve failed. You already reserve the " + propertyName + " from " + existedReserve.getStart_date() + " to " + existedReserve.getEnd_date() +". No multiple reserve for the same item.";
        }

        List<Reserve> overlapReserve = propertyMapper.checkReserveCondition(customerEmail, startDate, endDate);
        if (overlapReserve != null && overlapReserve.size() != 0) {
            return "Reserve failed. Your reserve has a time conflict with at least one of your other reserves. Please reserve only one property for the same day.";
        }

        propertyMapper.reserveProperty(propertyName, ownerEmail, customerEmail, startDate, endDate,numGuests);
        return "Reserved succeeded!";

    }

    @Override
    public List<ReserveInfo> viewCustomerFutureReservations(String customerEmail) {
//        System.out.println(propertyMapperr.viewCustomerFutureReservations(customerEmail));
        return propertyMapper.viewCustomerFutureReservations(customerEmail);
    }

    @Override
    public List<ReserveInfo> viewCustomerPastReservations(String customerEmail) {
        return propertyMapper.viewCustomerPastReservations(customerEmail);
    }

    @Override
    public List<ReserveInfo> viewReservationsToReview(String customerEmail) {
        List<ReserveInfo> pastReservations = propertyMapper.viewCustomerPastReservations(customerEmail);
        ArrayList<ReserveInfo> reservationsToReview = new ArrayList<>();
        for (ReserveInfo reservation: pastReservations) {
            if (reservation.getReview() == null) {
                reservationsToReview.add(reservation);
            }
        }
        return reservationsToReview;
    }

    @Override
    public List<ReserveInfo> viewPropertyReservations() {
        return propertyMapper.viewPropertyReservations();
    }

    @Override
    public String cancelPropertyReservation(String propertyName, String ownerEmail, String customerEmail) {
        propertyMapper.cancelPropertyReservation(propertyName, ownerEmail, customerEmail);
        return "cancel the reservation for " + propertyName + " succeeded!";
    }

    @Override
    public String reviewReservation(String propertyName, String ownerEmail, String customerEmail, String content, Integer score) {
        if (score == null) {
            return "please type in valid score";
        }
        propertyMapper.reviewReservation(propertyName, ownerEmail, customerEmail, content, score);
        return "review the reservation for " + propertyName + " succeeded!";
    }

    @Override
    public List<ReserveInfo> viewOwnersToRate(String customerEmail) {
        List<ReserveInfo> pastOwners = propertyMapper.viewOwnersToRate(customerEmail);
        ArrayList<ReserveInfo> ownersToRate = new ArrayList<>();
        for (ReserveInfo reservation: pastOwners) {
            if (reservation.getRating() == null) {
               ownersToRate.add(reservation);
            }
        }
        return ownersToRate;
    }

    @Override
    public String rateOwner(String ownerEmail, String customerEmail, Integer score) {
        propertyMapper.rateOwner(ownerEmail, customerEmail, score);
        return "rate " + ownerEmail + " succeed!";
    }


    @Override
    public PropertyInfo addProperty(Property property, String nearestAirport,   Integer distance) {
        property.setAddress(property.getStreet() + ',' + property.getCity() + ',' + property.getState() + ',' + property.getZip());
        PropertyInfo returnPropertyInfo = new PropertyInfo();
        if (propertyMapper.checkAddressExist(property) != null) {
            returnPropertyInfo.setMessage("Address already exists!");
            return  returnPropertyInfo;
        }

        if (propertyMapper.checkNameExist(property) != null) {
            returnPropertyInfo.setMessage("The property name already exists in your properties!");
            return returnPropertyInfo;
        }

        if (property.getCapacity() <= 0) {
            returnPropertyInfo.setMessage("Capacity must be larger than 0");
            return returnPropertyInfo;
        }

        if (nearestAirport != null && airportMapper.check_airport(nearestAirport) == null) {
            returnPropertyInfo.setMessage("This nearest airport does not exists!");
            return returnPropertyInfo;
        }

        if (nearestAirport != null && distance == null) {
            returnPropertyInfo.setMessage("You must enter the distance of the nearest airport");
            return returnPropertyInfo;
        }

        propertyMapper.addProperty(property);
        if (nearestAirport != null) {
            propertyMapper.addCloseAirport(property.getProperty_name(), property.getOwner_email(), nearestAirport, distance);
        }

        returnPropertyInfo = propertyMapper.checkPropertyExist(property.getProperty_name(), property.getOwner_email());
        returnPropertyInfo.setAddress(returnPropertyInfo.getStreet() + ',' + returnPropertyInfo.getCity() + ',' + returnPropertyInfo.getState() + ',' + returnPropertyInfo.getZip());
        returnPropertyInfo.setMessage("Successfully added this property!");
        return returnPropertyInfo;
    }
}

package com.cs4400.service_backend.service.impl;

import com.cs4400.service_backend.entity.Account;
import com.cs4400.service_backend.mapper.PropertyMapper;
import com.cs4400.service_backend.entity.Property;
import com.cs4400.service_backend.entity.Reserve;
import com.cs4400.service_backend.service.PropertyProcess;
import com.cs4400.service_backend.vo.LoginInfo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.sql.Date;
import java.util.List;

@Service
public class PropertyProcessImpl implements PropertyProcess {

    @Resource
    private PropertyMapper propertyMapper;

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
    public List<Property> viewAvailableProperties(Date start, Date end) {
//        System.out.println(propertyMapper.getAllProperties());

        List<Property> properties = propertyMapper.viewAvailableProperties(start, end);
        return properties;
    }

    @Override
    public String reserveProperty(String propertyName, String ownerEmail, String customerEmail, Date startDate, Date endDate, Integer numGuests) {
        if (startDate.compareTo(endDate) > 0) {
            return "the end date has to after start date";
        }

        Reserve existedReserve = propertyMapper.checkReserveExist(propertyName, ownerEmail, customerEmail);
        if (existedReserve != null) {
            return "Reserve failed. You already reserve the " + propertyName + " from " + existedReserve.getStart_date() + " to " + existedReserve.getEnd_date() +". No multiple reserve for the same item";
        }

        List<Reserve> overlapReserve = propertyMapper.checkReserveCondition(customerEmail, startDate, endDate);
        if (overlapReserve != null && overlapReserve.size() != 0) {
            return "Reserve failed. Your reserve has a time conflict with at least one of your other reserves. Please reserve only one property for the same day.";
        }

        propertyMapper.reserveProperty(propertyName, ownerEmail, customerEmail, startDate, endDate,numGuests);
        return "reserved Successfully";

    }


}

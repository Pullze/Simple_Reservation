package com.cs4400.service_backend.service.impl;

import com.cs4400.service_backend.entity.Reserve;
import com.cs4400.service_backend.mapper.PropertyMapper;
import com.cs4400.service_backend.entity.Property;
import com.cs4400.service_backend.service.PropertyProcess;
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

        propertyMapper.reserveProperty(propertyName, ownerEmail, customerEmail, startDate, endDate,numGuests);
        return "Reserved succeeded!";

    }


}

package com.cs4400.service_backend.mapper;

import com.cs4400.service_backend.entity.Flight;

import java.sql.Date;
import java.sql.Time;

public interface FlightMapper {
    Flight schedule_flight(String flight_num, String airline_name, String  from_airport , String to_airport,
                           Time departure_time, Time arrival_time, Date flight_date, int cost, int capacity,
                           Date current_date);
}
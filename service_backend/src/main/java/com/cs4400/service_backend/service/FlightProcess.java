package com.cs4400.service_backend.service;

import com.cs4400.service_backend.entity.Flight;

import java.sql.Date;
import java.sql.Time;

public interface FlightProcess {
    String schedule_flight(String flight_num, String airline_name, String  from_airport , String to_airport,
                           Time departure_time, Time arrival_time, Date flight_date, double cost, int capacity,
                           Date current_date);

    Flight check_flight(String flight_num, String airline_name);
}

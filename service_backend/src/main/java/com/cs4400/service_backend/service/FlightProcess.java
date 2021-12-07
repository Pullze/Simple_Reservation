package com.cs4400.service_backend.service;

import com.cs4400.service_backend.entity.Flight;
import com.cs4400.service_backend.vo.FlightInfo;

import java.sql.Date;
import java.sql.Time;

public interface FlightProcess {
    FlightInfo schedule_flight(FlightInfo flightInfo);

    Flight check_flight(String flight_num, String airline_name);
}

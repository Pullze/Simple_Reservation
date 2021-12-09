package com.cs4400.service_backend.service;

import com.cs4400.service_backend.entity.Flight;
import com.cs4400.service_backend.vo.BookInfo;
import com.cs4400.service_backend.vo.FlightInfo;

import java.util.List;

public interface FlightProcess {
    FlightInfo schedule_flight(FlightInfo flightInfo);

    List<Flight> view_flight(int minSeats);

}

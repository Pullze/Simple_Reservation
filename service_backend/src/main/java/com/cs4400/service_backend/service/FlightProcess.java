package com.cs4400.service_backend.service;

import com.cs4400.service_backend.entity.Flight;
import com.cs4400.service_backend.vo.FlightInfo;
import com.cs4400.service_backend.vo.RemoveFlightInfo;
import com.cs4400.service_backend.vo.ViewFlightInfo;

import java.util.List;

public interface FlightProcess {
    FlightInfo schedule_flight(FlightInfo flightInfo);

    List<Flight> customer_view_flight(int minSeats);

    List<ViewFlightInfo> getFlightInfo();

    Integer removeFlight(String flightNum, String airlineName, String currentDate);

    List<RemoveFlightInfo> viewRemoveFlight(String startDate, String endDate, String airlineName, String flightNumber);

}

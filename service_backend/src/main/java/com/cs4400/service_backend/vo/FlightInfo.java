package com.cs4400.service_backend.vo;

import com.cs4400.service_backend.entity.Flight;

public class FlightInfo {

    private Flight flight;

    String message;

    public FlightInfo(Flight flight, String message) {
        this.flight = flight;
        this.message = message;
    }
}

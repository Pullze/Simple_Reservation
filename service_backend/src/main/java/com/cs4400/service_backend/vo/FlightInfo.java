package com.cs4400.service_backend.vo;

import com.cs4400.service_backend.entity.Flight;
import lombok.Data;

@Data
public class FlightInfo {

    private Flight flight;

    private String message;

    public FlightInfo(Flight flight, String message) {
        this.flight = flight;
        this.message = message;
    }
}

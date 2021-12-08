package com.cs4400.service_backend.service;

import com.cs4400.service_backend.entity.Airline;
import com.cs4400.service_backend.vo.AirlineInfo;

import java.util.List;

public interface AirlineProcess {

    List<Airline> getAllAirline();

    List<AirlineInfo> getAirlineInfo();

}

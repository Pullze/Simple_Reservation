package com.cs4400.service_backend.service;

import com.cs4400.service_backend.entity.Airline;
import com.cs4400.service_backend.vo.ViewAirlineInfo;

import java.util.List;

public interface AirlineProcess {

    List<Airline> getAllAirline();

    List<ViewAirlineInfo> getAirlineInfo();

}

package com.cs4400.service_backend.service;

import com.cs4400.service_backend.vo.ViewAirportInfo;

import java.util.List;

public interface AirportProcess {

    List<ViewAirportInfo> getAirportInfo();

    List<String> getTimeZones();

}

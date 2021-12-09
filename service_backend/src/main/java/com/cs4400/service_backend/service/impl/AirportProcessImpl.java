package com.cs4400.service_backend.service.impl;

import com.cs4400.service_backend.mapper.AirportMapper;
import com.cs4400.service_backend.service.AirportProcess;
import com.cs4400.service_backend.vo.ViewAirportInfo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class AirportProcessImpl implements AirportProcess {

    @Resource
    private AirportMapper airportMapper;

    @Override
    public List<ViewAirportInfo> getAirportInfo() {
        return airportMapper.get_airport_info();
    }

    @Override
    public List<String> getTimeZones() {
        return airportMapper.get_time_zones();
    }

}

package com.cs4400.service_backend.service.impl;

import com.cs4400.service_backend.entity.Airline;
import com.cs4400.service_backend.mapper.AirlineMapper;
import com.cs4400.service_backend.service.AirlineProcess;
import com.cs4400.service_backend.vo.AirlineInfo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class AirlineProcessImpl implements AirlineProcess {

    @Resource
    private AirlineMapper airlineMapper;

    @Override
    public List<Airline> getAllAirline() {
        return airlineMapper.get_all_airline();
    }

    @Override
    public List<AirlineInfo> getAirlineInfo() {
        return airlineMapper.get_airline_info();
    }

}

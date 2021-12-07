package com.cs4400.service_backend.service.impl;

import com.cs4400.service_backend.entity.Flight;
import com.cs4400.service_backend.mapper.FlightMapper;
import com.cs4400.service_backend.service.FlightProcess;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.sql.Date;
import java.sql.Time;

@Service
public class FlightProcessImpl implements FlightProcess {

    @Resource
    private FlightMapper flightMapper;

    @Override
    public String schedule_flight(String flight_num, String airline_name, String from_airport , String to_airport,
                           Time departure_time, Time arrival_time, Date flight_date, double cost, int capacity,
                           Date current_date) {

        if (flight_date.compareTo(current_date) <= 0) {
            return "Can not schedule a flight not in a future date";
        }

        if (to_airport.equals(from_airport)) {
            return "Can not schedule a flight from and to the same airport";
        }

        Flight flight = flightMapper.check_flight(flight_num, airline_name);

        if (flight != null) {
            return "The combination of the flight number and the airline name already exists";
        } else  {
            flightMapper.schedule_flight(flight_num, airline_name, from_airport , to_airport,
                    departure_time, arrival_time, flight_date, cost, capacity);
            return "schedule succeeded";
        }

    }

    @Override
    public Flight check_flight(String flight_num, String airline_name) {
        return flightMapper.check_flight(flight_num, airline_name);
    }


}

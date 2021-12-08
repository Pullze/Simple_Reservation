package com.cs4400.service_backend.service.impl;

import com.cs4400.service_backend.entity.Airport;
import com.cs4400.service_backend.entity.Flight;
import com.cs4400.service_backend.mapper.FlightMapper;
import com.cs4400.service_backend.service.FlightProcess;
import com.cs4400.service_backend.vo.FlightInfo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.sql.Date;
import java.sql.Time;
import java.util.List;

@Service
public class FlightProcessImpl implements FlightProcess {

    @Resource
    private FlightMapper flightMapper;

    @Override
    public String schedule_flight(FlightInfo flightInfo) {

        String flight_num = flightInfo.getFlight_num();
        String airline_name = flightInfo.getAirline_name();
        String from_airport = flightInfo.getFrom_airport();
        String to_airport = flightInfo.getTo_airport();
        String departure_time = flightInfo.getDeparture_time();
        String arrival_time = flightInfo.getArrival_time();
        String flight_date = flightInfo.getFlight_date();
        double cost = flightInfo.getCost();
        int capacity = flightInfo.getCapacity();
        String current_date = flightInfo.getCurrent_date();


        if (flight_date.compareTo(current_date) <= 0) {
            return "Can not schedule a flight not in a future date!";
        }

        if (flightMapper.check_airport(from_airport) == null) {
           return "Can not departure from an airport that doesn't exist!";
        }

        if (flightMapper.check_airport(to_airport) == null) {
           return "Can not arrive at an airport that doesn't exist!";
        }

        if (to_airport.equals(from_airport)) {
           return "Can not schedule a flight from and to the same airport!";
        }

        if (arrival_time.compareTo(departure_time) <= 0) {
           return "arrival time is before departure time!";
        }



        if ( flightMapper.check_flight(flight_num, airline_name) != null) {
           return  "The combination of the flight number and the airline name already exists!";
        } else {
            flightMapper.schedule_flight(flight_num, airline_name, from_airport , to_airport,
                    departure_time, arrival_time, flight_date, cost, capacity);
           return "Schedule succeeded!";
        }

    }

    @Override
    public Flight check_flight(String flight_num, String airline_name) {
        return flightMapper.check_flight(flight_num, airline_name);
    }

    @Override
    public List<Flight> view_flight(int minSeats) {
        return flightMapper.view_flight(minSeats);
    }
}

package com.cs4400.service_backend.service.impl;

import com.cs4400.service_backend.entity.Flight;
import com.cs4400.service_backend.mapper.FlightMapper;
import com.cs4400.service_backend.service.FlightProcess;
import com.cs4400.service_backend.vo.FlightInfo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.sql.Date;
import java.sql.Time;

@Service
public class FlightProcessIMpl implements FlightProcess {

    @Resource
    private FlightMapper flightMapper;

    @Override
    public FlightInfo schedule_flight(FlightInfo flightInfo) {

        String flight_num = flightInfo.getFlight_num();
        String airline_name = flightInfo.getAirline_name();
        String from_airport = flightInfo.getFrom_airport();
        String to_airport = flightInfo.getTo_airport();
        Time departure_time = flightInfo.getDeparture_time();
        Time arrival_time = flightInfo.getArrival_time();
        Date flight_date = flightInfo.getFlight_date();
        double cost = flightInfo.getCost();
        int capacity = flightInfo.getCapacity();
        Date current_date = flightInfo.getCurrent_date();

        String message;

        if (flight_date.compareTo(current_date) <= 0) {
            message = "Can not schedule a flight not in a future date";
            return new FlightInfo(null, message);
        }

        if (to_airport.equals(from_airport)) {
            message = "Can not schedule a flight from and to the same airport";
            return new FlightInfo(null, message);
        }

        Flight flight = flightMapper.check_flight(flight_num, airline_name);

        if (flight != null) {
            message =  "The combination of the flight number and the airline name already exists";
            return new FlightInfo(null, message);
        } else  {
            flightMapper.schedule_flight(flight_num, airline_name, from_airport , to_airport,
                    departure_time, arrival_time, flight_date, cost, capacity);
            message =  "schedule succeeded";
            flight = check_flight(flight_num, airline_name);
            return new FlightInfo(flight, message);
        }

    }

    @Override
    public Flight check_flight(String flight_num, String airline_name) {
        return flightMapper.check_flight(flight_num, airline_name);
    }


}

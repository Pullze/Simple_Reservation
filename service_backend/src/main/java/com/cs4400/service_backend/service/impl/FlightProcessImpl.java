package com.cs4400.service_backend.service.impl;

import com.cs4400.service_backend.entity.Flight;
import com.cs4400.service_backend.mapper.AirlineMapper;
import com.cs4400.service_backend.mapper.AirportMapper;
import com.cs4400.service_backend.mapper.FlightMapper;
import com.cs4400.service_backend.service.FlightProcess;
import com.cs4400.service_backend.vo.FlightInfo;
import com.cs4400.service_backend.vo.RemoveFlightInfo;
import com.cs4400.service_backend.vo.ViewFlightInfo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Service
public class FlightProcessImpl implements FlightProcess {

    @Resource
    private FlightMapper flightMapper;

    @Resource
    private AirlineMapper airlineMapper;

    @Resource
    private AirportMapper airportMapper;

    @Override
    public FlightInfo schedule_flight(FlightInfo flightInfo) {

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

        FlightInfo returnFlightInfo = new FlightInfo();

        if (airlineMapper.check_airline(airline_name) == null) {
            returnFlightInfo.setMessage("Airline doesn't exist");
            return returnFlightInfo;
        }

        if (flight_date.compareTo(current_date) <= 0) {
            returnFlightInfo.setMessage("Can not schedule a flight not in a future date!");
            return returnFlightInfo;
        }

        if (airportMapper.check_airport(from_airport) == null) {
            returnFlightInfo.setMessage("Can not departure from an airport that doesn't exist!");
           return returnFlightInfo;
        }

        if (airportMapper.check_airport(to_airport) == null) {
            returnFlightInfo.setMessage("Can not arrive at an airport that doesn't exist!");
            return returnFlightInfo;
        }

        if (to_airport.equals(from_airport)) {
            returnFlightInfo.setMessage( "Can not schedule a flight from and to the same airport!");
           return returnFlightInfo;
        }



        if ( flightMapper.check_flight(flight_num, airline_name) != null) {
            returnFlightInfo.setMessage("The combination of the flight number and the airline name already exists!");
           return  returnFlightInfo;
        } else {
            flightMapper.schedule_flight(flight_num, airline_name, from_airport , to_airport,
                    departure_time, arrival_time, flight_date, cost, capacity);
            returnFlightInfo = flightMapper.check_flight(flight_num, airline_name);
            returnFlightInfo.setMessage("Schedule succeeded!");
           return returnFlightInfo;
        }

    }


    @Override
    public List<Flight> view_flight(int minSeats) {
        return flightMapper.view_flight(minSeats);
    }

    @Override
    public List<ViewFlightInfo> getFlightInfo() {
        return flightMapper.get_flight_info();
    }

    @Override
    public Integer removeFlight(String flightNum, String airlineName, String currentDate) {

        Date paramDate;
        try {
            paramDate = Date.valueOf(currentDate); // convert string currentDate param to java.sql.Date
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            return -1;
        }

        Date realDate = Date.valueOf(LocalDate.now());

        if (false && !realDate.equals(paramDate)) { // check if the passed-in date is really today
            return -2;
        }

        Integer count = 0;

        if (!flightMapper.check_if_future_flight(flightNum, airlineName, paramDate)) { // check if is future flight
            return -3;
        } else {
            count += flightMapper.remove_book_flight(flightNum, airlineName);
            count += flightMapper.remove_flight(flightNum, airlineName);
        }

        return count;

    }

    @Override
    public List<RemoveFlightInfo> viewRemoveFlight(String startDate, String endDate, String airlineName, String flightNumber) {

        try {
            if (startDate != null && !startDate.equals("")) {
                Date.valueOf(startDate);
            }
            if (endDate != null && !endDate.equals("")) {
                Date.valueOf(endDate);
            }
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            return null;
        }

        List<RemoveFlightInfo> result;

        try {
            result = flightMapper.view_remove_flight(startDate, endDate, airlineName, flightNumber);
        } catch (Exception e) {
            e.printStackTrace();
            result = null;
        }

        return result;

    }

}

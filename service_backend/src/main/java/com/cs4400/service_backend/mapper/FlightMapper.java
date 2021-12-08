package com.cs4400.service_backend.mapper;

import com.cs4400.service_backend.entity.Airport;
import com.cs4400.service_backend.entity.Flight;
import org.apache.ibatis.annotations.Mapper;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

@Mapper
public interface FlightMapper {
    void schedule_flight(String flight_num, String airline_name, String  from_airport , String to_airport,
                           Time departure_time, Time arrival_time, Date flight_date, double cost, int capacity);

    Flight check_flight(String flight_num, String airline_name);

    Airport check_airport(String airport_id);

    List<Flight> view_flight(int minSeats);
}
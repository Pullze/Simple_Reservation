package com.cs4400.service_backend.mapper;

import com.cs4400.service_backend.entity.Airport;
import com.cs4400.service_backend.entity.Flight;
import com.cs4400.service_backend.vo.AirportInfo;
import com.cs4400.service_backend.vo.FlightInfo;
import org.apache.ibatis.annotations.Mapper;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

@Mapper
public interface FlightMapper {
    void schedule_flight(String flight_num, String airline_name, String  from_airport , String to_airport,
                           String departure_time, String arrival_time, String flight_date, double cost, int capacity);

    FlightInfo check_flight(String flight_num, String airline_name);

    AirportInfo check_airport(String airport_id);

    List<Flight> view_flight(int minSeats);
}

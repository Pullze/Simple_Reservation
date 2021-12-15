package com.cs4400.service_backend.mapper;

import com.cs4400.service_backend.entity.Flight;
import com.cs4400.service_backend.vo.FlightInfo;
import com.cs4400.service_backend.vo.RemoveFlightInfo;
import com.cs4400.service_backend.vo.ViewFlightInfo;
import org.apache.ibatis.annotations.Mapper;

import java.sql.Date;
import java.util.List;

@Mapper
public interface FlightMapper {
    void schedule_flight(String flight_num, String airline_name, String  from_airport , String to_airport,
                           String departure_time, String arrival_time, String flight_date, double cost, int capacity);

    FlightInfo check_flight(String flight_num, String airline_name);


//  retrieve remaining_seats
    Integer check_flight_seats(String flight_num, String airline_name);

    List<Flight> customer_view_flight(int minSeats, String currentDate);

    List<ViewFlightInfo> get_flight_info();

    Boolean check_if_future_flight(String flight_num, String airline_name, Date current_date);

    Integer remove_flight(String flight_num, String airline_name);



    List<RemoveFlightInfo> view_remove_flight(String start_date, String end_date,
                                              String airline_name, String flight_num);


}

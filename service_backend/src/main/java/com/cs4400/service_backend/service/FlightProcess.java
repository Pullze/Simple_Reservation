package com.cs4400.service_backend.service;

import com.cs4400.service_backend.entity.Flight;
import com.cs4400.service_backend.vo.BookInfo;
import com.cs4400.service_backend.vo.FlightInfo;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

public interface FlightProcess {
    FlightInfo schedule_flight(FlightInfo flightInfo);

    List<Flight> view_flight(int minSeats);

    BookInfo book_flight(String flight_num, String airline_name, String customer_email, String flight_date, int num_seats);
}

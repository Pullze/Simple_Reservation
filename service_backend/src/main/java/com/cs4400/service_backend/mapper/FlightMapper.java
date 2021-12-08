package com.cs4400.service_backend.mapper;

import com.cs4400.service_backend.entity.Airport;
import com.cs4400.service_backend.entity.Book;
import com.cs4400.service_backend.entity.Flight;
import com.cs4400.service_backend.vo.BookInfo;
import org.apache.ibatis.annotations.Mapper;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

@Mapper
public interface FlightMapper {
    void schedule_flight(String flight_num, String airline_name, String  from_airport , String to_airport,
                           Time departure_time, Time arrival_time, Date flight_date, double cost, int capacity);

    void update_book (String flight_num, String airline_name, String customer_email, int num_seats);

    void book_new_flight(String flight_num, String airline_name, String customer_email, int num_seats);

    // retrieve book information including the cost of new booked setas and total cost.
    BookInfo check_bookIfo (String flight_num, String airline_name, String customer_email, int seats_booked);

    Flight check_flight(String flight_num, String airline_name);

    Integer check_flight_seats(String flight_num, String airline_name);

    Book check_if_booked_flight(String flight_num, String airline_name, String customer_email);

    Book check_book_cancelled(String flight_num, String airline_name, String customer_email);

    Book check_book_by_date (String customer_email, Date flight_fate);



    Airport check_airport(String airport_id);

    List<Flight> view_flight(int minSeats);
}
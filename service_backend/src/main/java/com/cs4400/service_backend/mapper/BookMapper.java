package com.cs4400.service_backend.mapper;

import com.cs4400.service_backend.entity.Book;
import com.cs4400.service_backend.vo.BookInfo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BookMapper {

    void book_new_flight(String flight_num, String airline_name, String customer_email, int book_seats);

    void update_book_seats (String flight_num, String airline_name, String customer_email, int book_seats);

    Integer cancel_book (String flight_num, String airline_name, String customer_email);

    // retrieve book information of a flight including the cost of new booked seats and total cost.
    BookInfo check_bookInfo (String flight_num, String airline_name, String customer_email, int book_seats);

    Book check_if_booked_flight(String flight_num, String airline_name, String customer_email);

    Book check_book_cancelled(String flight_num, String airline_name, String customer_email);

    Book check_book_by_date (String customer_email, String flight_date);

    // remove all books on the flight
    Integer remove_all_book_flight(String flight_num, String airline_name);

    // retrieve all non-cancelled books of a customer
    List<Book> check_all_book_customer(String customer_email);


}

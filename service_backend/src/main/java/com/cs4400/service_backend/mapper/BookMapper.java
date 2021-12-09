package com.cs4400.service_backend.mapper;

import com.cs4400.service_backend.entity.Book;
import com.cs4400.service_backend.vo.BookInfo;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BookMapper {

    void book_new_flight(String flight_num, String airline_name, String customer_email, int book_seats);

    void update_book (String flight_num, String airline_name, String customer_email, int book_seats);

    // retrieve book information including the cost of new booked seats and total cost.
    BookInfo check_bookInfo (String flight_num, String airline_name, String customer_email, int book_seats);

    Book check_if_booked_flight(String flight_num, String airline_name, String customer_email);

    Book check_book_cancelled(String flight_num, String airline_name, String customer_email);

    Book check_book_by_date (String customer_email, String flight_date);
}

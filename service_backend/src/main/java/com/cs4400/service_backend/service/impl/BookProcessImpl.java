package com.cs4400.service_backend.service.impl;

import com.cs4400.service_backend.mapper.BookMapper;
import com.cs4400.service_backend.mapper.FlightMapper;
import com.cs4400.service_backend.service.BookProcess;
import com.cs4400.service_backend.vo.BookInfo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class BookProcessImpl implements BookProcess {

    @Resource
    private FlightMapper flightMapper;

    @Resource
    private BookMapper bookMapper;

    /**
     *
     * @param bookInfo book information,
     * fields required: flight_num, airline_name, customer_email, book_seats, flight_date
     * @return if successful return corresponding book information from database
     */

    @Override
    public BookInfo book_flight(BookInfo bookInfo) {

        String flight_num = bookInfo.getFlight_num();
        String airline_name = bookInfo.getAirline_name();
        String customer_email = bookInfo.getCustomer();
        int book_seats = bookInfo.getBook_seats();
        String flight_date = bookInfo.getFlight_date();

        if (bookMapper.check_book_cancelled(flight_num, airline_name, customer_email) != null) {
            return new BookInfo("Already cancelled a book on this flight!");
        }

        if (bookMapper.check_if_booked_flight(flight_num, airline_name, customer_email) != null) {
            if ( flightMapper.check_flight_seats(flight_num, airline_name) < book_seats) {
                return new BookInfo("No sufficient seats to book!");
            } else {
                bookMapper.update_book(flight_num, airline_name, customer_email, book_seats);
                BookInfo returnBookInfo = bookMapper.check_bookInfo(flight_num, airline_name, customer_email, book_seats);
                returnBookInfo.setBook_message("You have successfully updated booking on this flight.");
                return returnBookInfo;
            }
        } else if (bookMapper.check_book_by_date(customer_email, flight_date) != null) {
            return new BookInfo("Already booked a flight on this date");
        } else if (flightMapper.check_flight_seats(flight_num, airline_name) < book_seats) {
            return new BookInfo("No sufficient seats to book!");
        } else {
            bookMapper.book_new_flight(flight_num, airline_name, customer_email, book_seats);
            BookInfo returnBookInfo = bookMapper.check_bookInfo(flight_num, airline_name, customer_email, book_seats);
            returnBookInfo.setBook_message("You have successfully booked this flight.");
            return returnBookInfo;
        }


    }
}

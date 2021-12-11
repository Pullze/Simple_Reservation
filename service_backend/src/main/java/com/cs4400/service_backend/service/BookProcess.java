package com.cs4400.service_backend.service;

import com.cs4400.service_backend.entity.Book;
import com.cs4400.service_backend.entity.Customer;
import com.cs4400.service_backend.vo.BookInfo;

import java.util.List;

public interface BookProcess {

    BookInfo book_flight(BookInfo bookInfo);

    List<Book> customer_view_books(String customer_email);

    Integer cancel_book (String flight_num, String airline_name, String customer_email);
}

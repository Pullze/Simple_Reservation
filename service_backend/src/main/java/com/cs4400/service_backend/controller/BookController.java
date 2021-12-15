package com.cs4400.service_backend.controller;

import com.cs4400.service_backend.entity.Book;
import com.cs4400.service_backend.entity.Response;
import com.cs4400.service_backend.service.BookProcess;
import com.cs4400.service_backend.vo.BookInfo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModelProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api (tags = "Book Controller")

@RestController
public class BookController {

    @Autowired
    private BookProcess bookProcess;

    /**
     *
     * @param bookInfo book information,
     * fields required: flight_num, airline_name, customer_email, book_seats, flight_date
     * @return if successful return corresponding book information from database
     */
    @PostMapping(value = "/book_flight")
    @ApiModelProperty(value = "book flight", notes = "book flight")
    public Response<?> book_flight(@RequestPart("jsonValue") BookInfo bookInfo) {

        BookInfo returnBookInfo = bookProcess.book_flight(bookInfo);

        Response<BookInfo> response = new Response<>();
        response.setData(returnBookInfo);
        response.setMessage(returnBookInfo.getBook_message());

        if (response.getMessage().equals("You have successfully updated booking on this flight.") ||
            response.getMessage().equals("You have successfully booked this flight."))  {
            response.setCode(200);
        } else {
            response.setCode(400);
        }

        return response;
    }

    /**
     *
     * @param customer_email customer email
     * @return all books of this customer after current date
     */
    @GetMapping(value = "/customer_view_books")
    @ApiModelProperty(value = "customer_view_books")
    public Response<?> customer_view_books(@RequestParam String customer_email, @RequestParam String currentDate) {
        List<Book> books = bookProcess.customer_view_books(customer_email, currentDate);
        Response<List<Book>> response =new Response<>(200, books);
        return response;
    }

    @PostMapping(value = "/cancel_flight")
    @ApiModelProperty(value = "cancel flight")
    public Response<?> customer_cancel_book(@RequestParam  String flight_num, @RequestParam String airline_name, @RequestParam String customer_email) {
        int cancelled = bookProcess.cancel_book(flight_num, airline_name, customer_email);
        if (cancelled == 1) {
            return new Response<>(200, "Successfully cancelled a flight!");
        } else {
            return new Response<>(400, "Failed to cancel this flight! ");
        }
    }
}

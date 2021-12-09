package com.cs4400.service_backend.controller;

import com.cs4400.service_backend.entity.Response;
import com.cs4400.service_backend.service.BookProcess;
import com.cs4400.service_backend.vo.BookInfo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModelProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public Response<BookInfo> book_flight(@RequestPart("jsonValue") BookInfo bookInfo) {

        BookInfo returnBookInfo = bookProcess.book_flight(bookInfo);

        Response<BookInfo> response = new Response<>();
        response.setData(returnBookInfo);
        response.setMessage(returnBookInfo.getBook_message());

        if (response.getMessage().equals("Successfully updated booking on this flight!") ||
            response.getMessage().equals("Successfully booked this flight!"))  {
            response.setCode(200);
        } else {
            response.setCode(400);
        }

        return response;
    }
}

package com.cs4400.service_backend.vo;

import com.cs4400.service_backend.entity.Book;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;


@Data
public class BookInfo extends Book {



    @ApiModelProperty(value = "book_cost")
    private int book_cost;

    @ApiModelProperty(value = "flight_date")
    private String flight_date;

    // the number of seats to book
    @ApiModelProperty(value = "book_seats")
    private int book_seats;

    @ApiModelProperty(value = "book_message")
    private String book_message;

    public BookInfo (String message) {
        book_message = message;
    }

    public BookInfo () {};




}

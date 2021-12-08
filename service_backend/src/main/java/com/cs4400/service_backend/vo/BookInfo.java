package com.cs4400.service_backend.vo;

import com.cs4400.service_backend.entity.Book;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;


@Data
public class BookInfo extends Book {


    @ApiModelProperty(value = "seats_booked")
    private int seats_booked;

    @ApiModelProperty(value = "book_cost")
    private int book_cost;

    @ApiModelProperty(value = "book_message")
    private String book_message;

    public BookInfo (String message) {
        book_message = message;
    }

    public BookInfo () {};


}

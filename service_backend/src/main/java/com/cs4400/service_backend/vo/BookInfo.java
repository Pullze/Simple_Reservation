package com.cs4400.service_backend.vo;

import com.cs4400.service_backend.entity.Flight;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
public class BookInfo extends Flight{


    @ApiModelProperty(value = "customer_email")
    private String customer_email;

    @ApiModelProperty(value = "booked_seats")
    private int booked_seats;

    @ApiModelProperty(value = "total_cost")
    private int total_cost;

    @ApiModelProperty(value = "book_message")
    private String book_message;

    public BookInfo (String message) {
        book_message = message;
    }

    public BookInfo () {};


    public BookInfo(Flight flight, String customer_email, int booked_seats, int total_cost, String book_message) {
        super(flight);
        this.customer_email = customer_email;
        this.booked_seats = booked_seats;
        this.total_cost = total_cost;
        this.book_message = book_message;
    }
}

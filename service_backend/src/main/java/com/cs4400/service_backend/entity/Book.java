package com.cs4400.service_backend.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class Book {

    @ApiModelProperty(value = "Customer Email")
    private String customer;

    @ApiModelProperty(value = "Flight Num")
    private String flight_num;

    @ApiModelProperty(value = "Airline Name")
    private String airline_name;

    @ApiModelProperty(value = "Number of Seats")
    private Integer num_seats;

    @ApiModelProperty(value = "Was Cancelled")
    private Integer was_cancelled;

    @ApiModelProperty(value = "Total Cost")
    private Double total_cost;

    @ApiModelProperty(value = "Cancellation Fee")
    private Double cancellation_fee;

}

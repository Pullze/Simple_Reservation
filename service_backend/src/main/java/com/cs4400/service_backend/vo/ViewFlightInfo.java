package com.cs4400.service_backend.vo;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.sql.Date;
import java.sql.Time;

@Data
public class ViewFlightInfo {

    @ApiModelProperty(value = "Flight Id")
    private String flight_id;

    @ApiModelProperty(value = "Flight Date")
    private Date flight_date;

    @ApiModelProperty(value = "Airline")
    private String airline;

    @ApiModelProperty(value = "From")
    private String from;

    @ApiModelProperty(value = "To")
    private String to;

    @ApiModelProperty(value = "Departure Time")
    private Time departure_time;

    @ApiModelProperty(value = "Arrival Time")
    private Time arrival_time;

    @ApiModelProperty(value = "Cost per Seat")
    private Double seat_cost;

    @ApiModelProperty(value = "#Empty Seats")
    private Integer num_empty_seats;

    @ApiModelProperty(value = "Total Spent")
    private Double total_spent;

}

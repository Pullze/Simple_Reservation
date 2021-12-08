package com.cs4400.service_backend.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;


import javax.validation.constraints.NotNull;
import java.util.Date;


@Data
public class Flight {

    @NotNull
    @ApiModelProperty(value = "flight_num")
    private String flight_num;

    @NotNull
    @ApiModelProperty(value = "airline_name")
    private String airline_name;

    @NotNull
    @ApiModelProperty(value = "departure_time")
    private Date departure_time;

    @ApiModelProperty(value = "arrival_time")
    private Date arrival_time;

    @ApiModelProperty(value = "flight_date")
    private Date flight_date;

    @ApiModelProperty(value = "cost")
    private double cost;

    @ApiModelProperty(value = "capacity")
    private int capacity;

    @ApiModelProperty(value = "from_airport")
    private String from_airport;

    @ApiModelProperty(value = "to_airport")
    private String to_airport;

    @ApiModelProperty(value = "remaining_seats")
    private int remaining_seats;

    @ApiModelProperty(value = "total_spent")
    private int total_spent;


}

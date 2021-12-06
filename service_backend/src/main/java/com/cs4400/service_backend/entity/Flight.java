package com.cs4400.service_backend.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.Date;

@Data
public class Flight {

    @ApiModelProperty(value = "flight_num")
    private int flight_num;

    @ApiModelProperty(value = "airline_name")
    private int airline_name;

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

    @ApiModelProperty(value = "remaing_seats")
    private int remaining_seats;

    @ApiModelProperty(value = "nearest_airport")
    private int nearest_airport;

    @ApiModelProperty(value = "nearest_aiprort_distance")
    private int nearest_airport_distance;

}

package com.cs4400.service_backend.entity;

import io.swagger.annotations.ApiModelProperty;

import java.util.Date;

public class Flight {
    @ApiModelProperty(value = "flight_num")
    public int Flight_Num;

    @ApiModelProperty(value = "airline_name")
    public int Airline_Name;

    @ApiModelProperty(value = "departure_time")
    public Date Departure_Time;

    @ApiModelProperty(value = "arrival_time")
    public Date Arrival_Time;

    @ApiModelProperty(value = "flight_date")
    public Date Flight_Date;

    @ApiModelProperty(value = "cost")
    public double Cost;

    @ApiModelProperty(value = "capacity")
    public int Capacity;

    @ApiModelProperty(value = "from_airport")
    public String From_Airport;

    @ApiModelProperty(value = "to_airport")
    public String To_Airport;

    @ApiModelProperty(value = "remaing_seats")
    public int Remaning_Seats;

    @ApiModelProperty(value = "nearest_airport")
    public int Nearest_Airport;

    @ApiModelProperty(value = "nearest_aiprort_distance")
    public int Nearest_Airport_Distance;

}

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

    public Flight(@NotNull String flight_num, @NotNull String airline_name, @NotNull Date departure_time, Date arrival_time, Date flight_date, double cost, int capacity, String from_airport, String to_airport, int remaining_seats, int total_spent) {
        this.flight_num = flight_num;
        this.airline_name = airline_name;
        this.departure_time = departure_time;
        this.arrival_time = arrival_time;
        this.flight_date = flight_date;
        this.cost = cost;
        this.capacity = capacity;
        this.from_airport = from_airport;
        this.to_airport = to_airport;
        this.remaining_seats = remaining_seats;
        this.total_spent = total_spent;
    }

    public Flight(Flight flight) {
        this (flight.flight_num, flight.airline_name, flight.departure_time, flight.arrival_time,
                flight.flight_date, flight.cost, flight.capacity, flight.from_airport, flight.to_airport,
                flight.remaining_seats, flight.total_spent);

    }

    public Flight(){};


}

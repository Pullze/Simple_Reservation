package com.cs4400.service_backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.sql.Time;
import java.sql.Date;

@Data
public class Flight {

    @ApiModelProperty(value = "flight_num")
    private String flight_num;

    @ApiModelProperty(value = "airline_name")
    private String airline_name;

    @JsonFormat(pattern = "HH:mm:ss")
    @ApiModelProperty(value = "departure_time")
    private Time departure_time;

     @JsonFormat(pattern = "HH:mm:ss")
    @ApiModelProperty(value = "arrival_time")
    private Time arrival_time;

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


    public Flight(Flight flight) {
        this.flight_num = flight.flight_num;
        this.airline_name = flight.airline_name;
        this.departure_time = flight.departure_time;
        this.arrival_time = flight.arrival_time;
        this.flight_date = flight.flight_date;
        this.cost = flight.cost;
        this.capacity = flight.capacity;
        this.from_airport = flight.from_airport;
        this.to_airport = flight.to_airport;
    }

    public String getFlight_num() {
        return flight_num;
    }

    public void setFlight_num(String flight_num) {
        this.flight_num = flight_num;
    }

    public String getAirline_name() {
        return airline_name;
    }

    public void setAirline_name(String airline_name) {
        this.airline_name = airline_name;
    }

    public Time getDeparture_time() {
        return departure_time;
    }

    public void setDeparture_time(Time departure_time) {
        this.departure_time = departure_time;
    }

    public Time getArrival_time() {
        return arrival_time;
    }

    public void setArrival_time(Time arrival_time) {
        this.arrival_time = arrival_time;
    }

    public Date getFlight_date() {
        return flight_date;
    }

    public void setFlight_date(Date flight_date) {
        this.flight_date = flight_date;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public String getFrom_airport() {
        return from_airport;
    }

    public void setFrom_airport(String from_airport) {
        this.from_airport = from_airport;
    }

    public String getTo_airport() {
        return to_airport;
    }

    public void setTo_airport(String to_airport) {
        this.to_airport = to_airport;
    }

    public int getRemaining_seats() {
        return remaining_seats;
    }

    public void setRemaining_seats(int remaining_seats) {
        this.remaining_seats = remaining_seats;
    }

}

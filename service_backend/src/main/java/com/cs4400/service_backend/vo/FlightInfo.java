package com.cs4400.service_backend.vo;

import com.cs4400.service_backend.entity.Flight;
import com.cs4400.service_backend.service.FlightProcess;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class FlightInfo extends Flight {

    private String message = null;


    private String current_date;



    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getCurrent_date() {
        return current_date;
    }

    public void setCurrent_date(String current_date) {
        this.current_date = current_date;
    }
}
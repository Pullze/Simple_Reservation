package com.cs4400.service_backend.vo;

import com.cs4400.service_backend.entity.Flight;
import com.cs4400.service_backend.service.FlightProcess;
import lombok.Data;

import java.sql.Date;

@Data
public class FlightInfo extends Flight {


    private String message;

    public FlightInfo(Flight flight, String message) {
        super(flight);
        this.message = message;
    }

    private Date current_date;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Date getCurrent_date() {
        return current_date;
    }

    public void setCurrent_date(Date current_date) {
        this.current_date = current_date;
    }
}
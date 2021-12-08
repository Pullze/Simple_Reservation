package com.cs4400.service_backend.vo;

import com.cs4400.service_backend.entity.Flight;
import com.cs4400.service_backend.service.FlightProcess;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.Date;

@Data
public class FlightInfo extends Flight {

    @ApiModelProperty(value = "message")
    private String message = null;

    @ApiModelProperty(value = "current_date")
    private Date current_date;


}
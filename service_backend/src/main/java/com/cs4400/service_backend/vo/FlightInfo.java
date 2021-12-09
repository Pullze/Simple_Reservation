package com.cs4400.service_backend.vo;

import com.cs4400.service_backend.entity.Flight;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;



@Data
public class FlightInfo extends Flight {

    @ApiModelProperty(value = "message")
    private String message = null;

    @ApiModelProperty(value = "current_date")
    private String current_date;



}
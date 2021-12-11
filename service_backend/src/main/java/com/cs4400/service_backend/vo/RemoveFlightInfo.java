package com.cs4400.service_backend.vo;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class RemoveFlightInfo {

    @ApiModelProperty(value = "Airline Name")
    private String airline_name;

    @ApiModelProperty(value = "Flight Number")
    private String flight_number;

    @ApiModelProperty(value = "Date")
    private String date;

}

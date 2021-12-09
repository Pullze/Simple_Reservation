package com.cs4400.service_backend.vo;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class ViewAirlineInfo {

    @ApiModelProperty(value = "Name")
    private String airline_name;

    @ApiModelProperty(value = "Rating")
    private Double rating;

    @ApiModelProperty(value = "Total Flights")
    private Integer total_flights;

    @ApiModelProperty(value = "Minimum Flight Cost")
    private Double minimum_flight_cost;

}

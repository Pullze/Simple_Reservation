package com.cs4400.service_backend.vo;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class ViewAirportInfo {

    @ApiModelProperty(value = "Airport Id")
    private String airport_id;

    @ApiModelProperty(value = "Airport Name")
    private String airport_name;

    @ApiModelProperty(value = "Time Zone")
    private String time_zone;

    @ApiModelProperty(value = "Total Arriving Flights")
    private Integer total_arriving_flights;

    @ApiModelProperty(value = "Total Departing Flights")
    private Integer total_departing_flights;

    @ApiModelProperty(value = "Average Departing Flight Cost")
    private Double avg_departing_flight_cost;

}

package com.cs4400.service_backend.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

@Data
public class Airport {

    @ApiModelProperty(value = "Airport Id")
    private String airport_id;

    @ApiModelProperty(value = "Airport Name")
    private String airport_name;

    @ApiModelProperty(value = "Time Zone")
    private String time_zone;

    @ApiModelProperty(value = "State")
    private String state;

    @ApiModelProperty(value = "Address")
    private String address;

    @ApiModelProperty(value = "Attractions")
    private List<String> attractions;

}

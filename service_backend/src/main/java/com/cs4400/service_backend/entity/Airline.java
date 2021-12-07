package com.cs4400.service_backend.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class Airline {

    @ApiModelProperty(value = "name")
    private String airline_name;

    @ApiModelProperty(value = "rating")
    private int rating;

}

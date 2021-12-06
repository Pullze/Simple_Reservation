package com.cs4400.service_backend.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class Airline {
    @ApiModelProperty(value = "name")
    public String Name;

    @ApiModelProperty(value = "rating")
    public int Rating;
}

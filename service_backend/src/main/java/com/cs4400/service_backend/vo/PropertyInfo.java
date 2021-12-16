package com.cs4400.service_backend.vo;

import com.cs4400.service_backend.entity.Property;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class PropertyInfo extends Property {

    @ApiModelProperty("Message")
    private String message = null;

    @ApiModelProperty("nearestAirport")
    private String nearestAirport;

    @ApiModelProperty("distance")
    private Integer distance;
}

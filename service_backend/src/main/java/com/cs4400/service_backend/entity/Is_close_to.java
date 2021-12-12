package com.cs4400.service_backend.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class Is_close_to {
    @ApiModelProperty(value = "Property Name")
    private String property_name;

    @ApiModelProperty(value = "Owner Email")
    private String owner_email;

    @ApiModelProperty(value = "Airport Id")
    private String airport_id;

    @ApiModelProperty(value = "Distance")
    private int distance;
}

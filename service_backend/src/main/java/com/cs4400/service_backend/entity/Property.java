package com.cs4400.service_backend.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

@Data
public class Property {

    @ApiModelProperty(value = "Property Name")
    private String property_name;

    @ApiModelProperty(value = "Owner Email")
    private String owner_email;

    @ApiModelProperty(value = "Description")
    private String descr;

    @ApiModelProperty(value = "Rating")
    private Double rating;

    @ApiModelProperty(value = "Capacity")
    private Integer capacity;

    @ApiModelProperty(value = "Cost")
    private Double cost;

    // Compose of city, street, state, zip
    @ApiModelProperty(value = "Address")
    private String address;

    @ApiModelProperty(value = "Amenities")
    private List<String> amenities;


}

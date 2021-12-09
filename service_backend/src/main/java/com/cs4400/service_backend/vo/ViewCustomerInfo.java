package com.cs4400.service_backend.vo;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class ViewCustomerInfo {

    @ApiModelProperty(value = "Name")
    private String name;

    @ApiModelProperty(value = "Average Rating")
    private Double average_rating;

    @ApiModelProperty(value = "Location")
    private String location;

    @ApiModelProperty(value = "Is Owner")
    private Boolean is_owner;

    @ApiModelProperty(value = "Total Seats Purchased")
    private Integer total_seats_purchased;

}

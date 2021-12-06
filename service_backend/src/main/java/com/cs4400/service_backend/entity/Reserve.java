package com.cs4400.service_backend.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.sql.Date;

@Data
public class Reserve {

    @ApiModelProperty(value = "Property Name")
    private String property_name;

    @ApiModelProperty(value = "Owner Email")
    private String owner_email;

    @ApiModelProperty(value = " Customer Email")
    private String customer;

    @ApiModelProperty(value = "Start Date")
    private Date start_date;

    @ApiModelProperty(value = "End Date")
    private Date end_date;

    @ApiModelProperty(value = "Number of Guests")
    private Integer num_guests;

    @ApiModelProperty(value = "Was Cancelled")
    private Integer was_cancelled;

}

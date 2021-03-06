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
    private String start_date;

    @ApiModelProperty(value = "End Date")
    private String end_date;

    @ApiModelProperty(value = "Number of Guests")
    private Integer num_guests;

    @ApiModelProperty(value = "Was Cancelled")
    private Integer was_cancelled;

    public String getProperty_name() { return property_name; }

    public String getOwner_email() { return owner_email; }

    public String getCustomer() { return customer; }

    public String getStart_date() { return start_date; }

    public String getEnd_date() { return end_date; }

    public Integer getNum_guests() { return num_guests; }

    public Integer getWas_cancelled() { return was_cancelled; }
}

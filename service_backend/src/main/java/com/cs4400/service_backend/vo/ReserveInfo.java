package com.cs4400.service_backend.vo;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class ReserveInfo {

    @ApiModelProperty(value = "Name")
    private String propertyName;

    @ApiModelProperty(value = "ownerEmail")
    private String ownerEmail;

    @ApiModelProperty(value = "startDate")
    private String startDate;

    @ApiModelProperty(value = "Reserve end date")
    private String endDate;

    @ApiModelProperty(value = "customer Phone number")
    private String custPhone;

    @ApiModelProperty(value = "customer Email")
    private String customerEmail;

    @ApiModelProperty(value = "Property Cost")
    private String cost;

    @ApiModelProperty(value = "Property Review")
    private String review;

    @ApiModelProperty(value = "Property rating")
    private String rating;

    @ApiModelProperty(value = "Property Address")
    private String address;
}

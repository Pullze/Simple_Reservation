package com.cs4400.service_backend.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.sql.Date;

@Data
public class Customer extends Client{

    @ApiModelProperty(value = "ccNumber")
    private String ccNumber;

    @ApiModelProperty(value = "cvv")
    private String cvv;

    @ApiModelProperty(value = "Expiration Date")
    private Date exp_date;

    @ApiModelProperty(value = "Location")
    private String location;

}

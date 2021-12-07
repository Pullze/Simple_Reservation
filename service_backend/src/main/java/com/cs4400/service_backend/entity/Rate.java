package com.cs4400.service_backend.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class Rate {

    @ApiModelProperty(value = "Customer Email")
    private String customer;

    @ApiModelProperty(value = "Owner Email")
    private String owner_email;

    @ApiModelProperty(value = "Score")
    private Integer score;


}

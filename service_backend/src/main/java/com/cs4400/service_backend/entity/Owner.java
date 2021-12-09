package com.cs4400.service_backend.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class Owner extends Client {

    @ApiModelProperty(value = "Total Income")
    private Integer total_income;


}

package com.cs4400.service_backend.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class Client extends Account{

    @ApiModelProperty(value = "Phone Number")
    private String phone_number;

}

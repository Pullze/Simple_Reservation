package com.cs4400.service_backend.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class Client extends Account{

    @NotNull
    @ApiModelProperty(value = "Phone Number")
    private String phone_number;

}

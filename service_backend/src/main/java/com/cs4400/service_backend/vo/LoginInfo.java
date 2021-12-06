package com.cs4400.service_backend.vo;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class LoginInfo {
    @ApiModelProperty(value = "Email")
    private String email;

    @ApiModelProperty(value = "First Name")
    private String first_name;

    @ApiModelProperty(value = "Last Name")
    private String last_name;

    @ApiModelProperty(value = "is Admin?")
    private Integer is_admin;

    @ApiModelProperty(value = "is Client?")
    private Integer is_client;

    @ApiModelProperty(value = "is Customer?")
    private Integer is_customer;

    @ApiModelProperty(value = "is Owner?")
    private Integer is_owner;

    @ApiModelProperty(value = "is Success?")
    private boolean success;

}

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
    private Boolean is_admin;

    @ApiModelProperty(value = "is Client?")
    private Boolean is_client;

    @ApiModelProperty(value = "is Customer?")
    private Boolean is_customer;

    @ApiModelProperty(value = "is Owner?")
    private Boolean is_owner;

    @ApiModelProperty(value = "is Success?")
    private Boolean success;

    public void setSuccess(boolean b) {
        success = b;
    }
}

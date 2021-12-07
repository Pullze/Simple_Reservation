package com.cs4400.service_backend.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class Account {

    @ApiModelProperty(value = "Email")
    private String email;

    @ApiModelProperty(value = "First Name")
    private String first_Name;

    @ApiModelProperty(value = "Last Name")
    private String last_Name;

    @ApiModelProperty(value = "Password")
    private String pass;

    @ApiModelProperty(value = "Is Admin")
    private boolean admin;

}

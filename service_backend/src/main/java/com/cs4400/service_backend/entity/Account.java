package com.cs4400.service_backend.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class Account {

    @ApiModelProperty(value = "Email")
    public String email;

    @ApiModelProperty(value = "First Name")
    public String first_Name;

    @ApiModelProperty(value = "Last Name")
    public String last_Name;

    @ApiModelProperty(value = "Password")
    public String pass;

    @ApiModelProperty(value = "Is Admin")
    public boolean admin;

}

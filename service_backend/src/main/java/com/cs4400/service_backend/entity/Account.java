package com.cs4400.service_backend.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NonNull;

import javax.validation.constraints.NotNull;

@Data
public class Account {

    @NotNull
    @ApiModelProperty(value = "Email")
    private String email;

    @NotNull
    @ApiModelProperty(value = "First Name")
    private String first_name;

    @NotNull
    @ApiModelProperty(value = "Last Name")
    private String last_name;

    @ApiModelProperty(value = "Password")
    private String pass;

    @ApiModelProperty(value = "Is Admin")
    private boolean admin;

}
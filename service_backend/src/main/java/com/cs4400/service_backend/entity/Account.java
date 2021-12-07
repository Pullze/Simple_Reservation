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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

    public boolean isAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
    }
}
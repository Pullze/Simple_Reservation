package com.cs4400.service_backend.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.sql.Date;

@Data
public class Customer extends Client{

    @ApiModelProperty(value = "ccNumber")
    private String ccNumber;

    @ApiModelProperty(value = "cvv")
    private String cvv;

    @ApiModelProperty(value = "Expiration Date")
    private Date exp_date;

    @ApiModelProperty(value = "Location")
    private String location;

    public String getCcNumber() {
        return ccNumber;
    }

    public void setCcNumber(String ccNumber) {
        this.ccNumber = ccNumber;
    }

    public String getCvv() {
        return cvv;
    }

    public void setCvv(String cvv) {
        this.cvv = cvv;
    }

    public Date getExp_date() {
        return exp_date;
    }

    public void setExp_date(Date exp_date) {
        this.exp_date = exp_date;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}

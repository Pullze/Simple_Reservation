package com.cs4400.service_backend.entity;

import io.swagger.annotations.ApiModelProperty;

public class Review {
    @ApiModelProperty(value = "property_name")
    public String Property_Name;

    @ApiModelProperty(value = "owner_email")
    public String Owner_Email;

    @ApiModelProperty(value = "customer_Email")
    public String Custoemr_Email;

    @ApiModelProperty(value = "content")
    public String Content;

    @ApiModelProperty(value = "score")
    public int Score;
}

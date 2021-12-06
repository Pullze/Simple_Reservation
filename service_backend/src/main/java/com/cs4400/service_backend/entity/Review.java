package com.cs4400.service_backend.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class Review {

    @ApiModelProperty(value = "property_name")
    private String property_name;

    @ApiModelProperty(value = "owner_email")
    private String owner_email;

    @ApiModelProperty(value = "customer_Email")
    private String customer_Email;

    @ApiModelProperty(value = "content")
    private String content;

    @ApiModelProperty(value = "score")
    private int score;

}

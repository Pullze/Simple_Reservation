package com.cs4400.service_backend.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class Airline {

    @ApiModelProperty(value = "name")
    private String airline_name;

    @ApiModelProperty(value = "rating")
    private int rating;

    public String getName() {
        return airline_name;
    }

    public int getRating() {
        return rating;
    }

    public void setName(String name) {
        this.airline_name= name;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }
}

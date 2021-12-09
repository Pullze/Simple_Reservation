package com.cs4400.service_backend.vo;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class ViewOwnerInfo {

    @ApiModelProperty(value = "Name")
    private String name;

    @ApiModelProperty(value = "Average Rating")
    private Double average_rating;

    @ApiModelProperty(value = "Number of Properties Owned")
    private Integer number_of_properties_owned;

    @ApiModelProperty(value = "Average Property Rating")
    private Double average_property_rating;

}

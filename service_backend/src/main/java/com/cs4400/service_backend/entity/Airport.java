package com.cs4400.service_backend.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

@Data
public class Airport {

    @ApiModelProperty(value = "Airport Id")
    private String airport_id;

    @ApiModelProperty(value = "Airport Name")
    private String airport_name;

    @ApiModelProperty(value = "Time Zone")
    private String time_zone;

    @ApiModelProperty(value = "State")
    private String state;

    @ApiModelProperty(value = "Address")
    private String address;

    @ApiModelProperty(value = "Attractions")
    private List<String> attractions;

    public String getAirport_id() {
        return airport_id;
    }

    public void setAirport_id(String airport_id) {
        this.airport_id = airport_id;
    }

    public String getAirport_name() {
        return airport_name;
    }

    public void setAirport_name(String airport_name) {
        this.airport_name = airport_name;
    }

    public String getTime_zone() {
        return time_zone;
    }

    public void setTime_zone(String time_zone) {
        this.time_zone = time_zone;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public List<String> getAttractions() {
        return attractions;
    }

    public void setAttractions(List<String> attractions) {
        this.attractions = attractions;
    }
}

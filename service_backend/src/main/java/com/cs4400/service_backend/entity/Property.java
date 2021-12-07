package com.cs4400.service_backend.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

@Data
public class Property {

    @ApiModelProperty(value = "Property Name")
    private String property_name;

    @ApiModelProperty(value = "Owner Email")
    private String owner_email;

    @ApiModelProperty(value = "Description")
    private String descr;

    @ApiModelProperty(value = "Rating")
    private Double rating;

    @ApiModelProperty(value = "Capacity")
    private Integer capacity;

    @ApiModelProperty(value = "Cost")
    private Double cost;

    // Compose of city, street, state, zip
    @ApiModelProperty(value = "Address")
    private String address;

    @ApiModelProperty(value = "Amenities")
    private List<String> amenities;

    public String getProperty_name() {
        return property_name;
    }

    public void setProperty_name(String property_name) {
        this.property_name = property_name;
    }

    public String getOwner_email() {
        return owner_email;
    }

    public void setOwner_email(String owner_email) {
        this.owner_email = owner_email;
    }

    public String getDescr() {
        return descr;
    }

    public void setDescr(String descr) {
        this.descr = descr;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public Double getCost() {
        return cost;
    }

    public void setCost(Double cost) {
        this.cost = cost;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public List<String> getAmenities() {
        return amenities;
    }

    public void setAmenities(List<String> amenities) {
        this.amenities = amenities;
    }
}

package com.cs4400.service_backend.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class Owner extends Client {

    @ApiModelProperty(value = "Total Income")
    private Integer total_income;

    public void setTotal_income(Integer total_income) {
        this.total_income = total_income;
    }

    public Integer getTotal_income() {
        return total_income;

    }
}

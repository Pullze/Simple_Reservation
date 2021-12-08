package com.cs4400.service_backend.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class Response<T> {

    @ApiModelProperty(value = "Code")
    private int code;

    @ApiModelProperty(value = "Message")
    private String message;

    @ApiModelProperty(value = "Data")
    private T data;

    public Response(int code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public Response(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public Response() { }


}

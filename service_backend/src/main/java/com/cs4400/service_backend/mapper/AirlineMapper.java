package com.cs4400.service_backend.mapper;

import com.cs4400.service_backend.entity.Airline;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AirlineMapper {

    List<Airline> get_all_airline();

}

package com.cs4400.service_backend.mapper;

import com.cs4400.service_backend.entity.Airport;
import com.cs4400.service_backend.vo.AirportInfo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AirportMapper {

    List<AirportInfo> get_airport_info();

    List<String> get_time_zones();

    Airport check_airport(String airport_id);

}


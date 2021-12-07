import React, { useState, useEffect } from "react";
import { Table, Row, Col } from "antd";
import axios from "axios";
import "../config/config";

const columns = [
  {
    title: "Airline",
    dataIndex: "",
    key: "",
  },
  {
    title: "Number",
    dataIndex: "",
    key: "",
  },
  {
    title: "Date",
    dataIndex: "",
    key: "",
  },
  //   {
  //     title: "",
  //     dataIndex: "",
  //     key: "remove",
  //   },
];

function FlightList() {
  const [flights, setFlights] = useState([]);

  const getAccounts = async () => {
    const res = await axios.get("api/flights");
    const flights = await res.data;
    setFlights(flights);
  };

  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <Row justify="center">
      <Col xs={22} sm={20} md={16} lg={15} xl={15}>
        <Table dataSource={flights} columns={columns} />
      </Col>
    </Row>
  );
}

export default FlightList;

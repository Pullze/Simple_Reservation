import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Table, Input, Button, Spin } from "antd";
import { useLocation, useHistory } from "react-router";
import { Content } from "antd/lib/layout/layout";
import axios from "axios";
import Highlighter from "react-highlight-words";

export default function ViewFlight() {
  const location = useLocation();
  const history = useHistory();
  console.log(location.state);

  const state = useState;

  const [flights, setFlights] = state([]);
  const [seat, setSeat] = state();
  const [filtered, setFiltered] = state([]);
  const [loading, setLoading] = state(true);

  const highLight = () => ({
    render: (text) => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[seat]}
        autoEscape
        textToHighlight={text ? text.toString() : ""}
      />
    ),
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "flight_num",
      key: "flight_num",
      sorter: {
        compare: (a, b) => a.flight_num - b.flight_num,
        multiple: 1,
      },
    },
    {
      title: "Airline",
      dataIndex: "airline_name",
      key: "airline_name",
    },
    {
      title: "From",
      dataIndex: "from_airport",
      key: "from_airport",
    },
    {
      title: "To",
      dataIndex: "to_airport",
      key: "to_airport",
    },
    {
      title: "Dept. Time",
      dataIndex: "departure_time",
      key: "departure_time",
    },
    {
      title: "Arr. Time",
      dataIndex: "arrival_time",
      key: "arrival_time",
    },
    {
      title: "Date",
      dataIndex: "flight_date",
      key: "flight_date",
    },
    {
      title: "Available Seats",
      dataIndex: "remaining_seats",
      key: "remaining_seats",
      sorter: {
        compare: (a, b) => a.remaining_seats - b.remaining_seats,
        multiple: 1,
      },
      ...highLight(),
    },
    {
      title: "Cost per Seaet",
      dataIndex: "cost",
      key: "cost",
      sorter: {
        compare: (a, b) => a.cost - b.cost,
        multiple: 1,
      },
    },
  ];

  const inputFilter = (value) => {
    setSeat(value);
    setFiltered(
      flights.filter((flight) =>
        ("" + flight.remaining_seats).startsWith(value)
      )
    );
    console.log(filtered);
  };

  function getFlights() {
    axios
      .get("/api/customer_view_flights")
      .then((res) => {
        console.log(res.data);
        setFlights(res.data.data);
        setFiltered(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getFlights();
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ margin: "24px 24px 24px", background: "white" }}>
        <Row
          justify="center"
          align="middle"
          style={{ margin: "24px 24px 24px" }}
        >
          <Col xs={22} sm={20} md={17} lg={17} xl={16} xxl={15}>
            <Row justify="center" align="middle" gutter={[24, 24]}>
              <Col span={24} align="middle">
                <h2>Now logged in as {location.state.email}</h2>
                <h1 className="heading">View Flights</h1>
              </Col>
              <Col span={24} align="middle">
                <span>
                  Avaliable Seats:
                  <Input
                    style={{ maxWidth: "300px", marginLeft: "8px" }}
                    placeholder={"#"}
                    onChange={(e) => inputFilter(e.target.value)}
                  />
                </span>
              </Col>
              <Col>
                <Spin spinning={loading}>
                  <Table
                    dataSource={filtered}
                    columns={columns}
                    pagination={{ pageSize: 5 }}
                  />
                </Spin>
              </Col>
              <Col align="middle" span={24}>
                <Button onClick={() => history.goBack()}> Back </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

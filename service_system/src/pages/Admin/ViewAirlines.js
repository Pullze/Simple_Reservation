import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Table, Input, Button, Spin } from "antd";
import { useLocation, useHistory } from "react-router";
import { Content } from "antd/lib/layout/layout";
import axios from "axios";
import Highlighter from "react-highlight-words";

export default function ViewAirlines(props) {
  const location = useLocation();
  const history = useHistory();

  const [airlines, setAirlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [filtered, setFiltered] = useState([]);

  const highLight = () => ({
    render: (text) => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[name]}
        autoEscape
        textToHighlight={text ? text.toString() : ""}
      />
    ),
  });

    const columns = [
        {
            title: 'Name',
            dataIndex: 'airline_name',
            key: 'airline_name',
            ...highLight()
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            sorter: {
                compare: (a, b) => a.rating - b.rating,
                multiple: 1
            },
        },
        {
            title: 'Total Flights',
            dataIndex: 'total_flights',
            key: 'total_flights',
            sorter: {
                compare: (a, b) => a.total_flights - b.total_flights,
                multiple: 1
            },
        },
        {
            title: 'Minimum Flight Cost',
            dataIndex: 'minimum_flight_cost',
            key: 'minimum_flight_cost',
            sorter: {
                compare: (a, b) => a.minimum_flight_cost - b.minimum_flight_cost,
                multiple: 1
            },
        },
    ]

  const inputFilter = (value) => {
    setName(value);
    setFiltered(
      airlines.filter((airline) =>
        airline.airline_name.toLowerCase().startsWith(value.toLowerCase())
      )
    );
    console.log(filtered);
  };

  function getAirlines() {
    axios
      .get("/api/view_airline")
      .then((res) => {
        console.log(res.data);
        setAirlines(res.data.data);
        setFiltered(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getAirlines();
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ margin: "24px 24px 24px", background: "white" }}>
        <Row
          justify="center"
          align="middle"
          style={{ margin: "24px 24px 24px" }}
        >
          <Col xs={22} sm={20} md={16} lg={15} xl={15} xxl={15}>
            <Row justify="center" align="middle" gutter={[24, 24]}>
              <Col span={24} align="middle">
                <h2>Now logged in as {location.state.email}</h2>
                <h1 className="heading">View Airlines</h1>
              </Col>
              <Col span={24} align="middle">
                <span>
                  Name:
                  <Input
                    style={{ maxWidth: "300px", marginLeft: "8px" }}
                    placeholder={"Name"}
                    onChange={(e) => inputFilter(e.target.value)}
                  />
                </span>
              </Col>
              <Col>
                <Spin spinning={loading}>
                  <Table dataSource={filtered} columns={columns} pagination={{ pageSize: 8 }}/>
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

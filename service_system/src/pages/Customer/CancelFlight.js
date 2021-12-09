import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import {
  Layout,
  Row,
  Col,
  Form,
  Input,
  DatePicker,
  Select,
  Table,
  Button,
  message,
} from "antd";
import { Content } from "antd/lib/layout/layout";
import moment from "moment";
import axios from "axios";

const { Option } = Select;

const today = moment();

const columns = [
  {
    title: "Airline",
    dataIndex: "airline_name",
    sorter: (a, b) => a.airline_name.localeCompare(b.airline_name),
  },
  {
    title: "Flight Number",
    dataIndex: "flight_num",
    sorter: (a, b) => a - b,
  },
  {
    title: "Date",
    dataIndex: "flight_date",
    sorter: null,
  },
];

function CancelFlight() {
  const location = useLocation();
  const [form] = Form.useForm();
  const [airlines, setAirlines] = useState([]);
  const [flights, setFlights] = useState([]);
  const [query, setQuery] = useState({ airline_name: null, flight_num: null });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    axios
      .get("/api/airlines")
      .then((res) => setAirlines(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  //   useEffect(() => {
  //     if (query) {
  //       axios
  //         .get("/api/flights", { params: query })
  //         .then((res) =>
  //           setFlights(
  //             res.data.data.map((item, i) => ({
  //               ...item,
  //               key: i,
  //  //           isCancelled: false
  //             }))
  //           )
  //         )
  //         .catch((err) => console.error(err));
  //     }
  //   }, [query]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => setSelectedRowKeys(selectedRowKeys),
  };

  const handleCancel = () => {
    if (selectedRowKeys.length === 0) {
      message.error("Please select a flight.");
    } else {
      const flight = flights[selectedRowKeys[0]];
      const { airline_name, flight_num } = flight;
      const formData = new FormData();
      formData.append(
        "jsonValue",
        new Blob([JSON.stringify({ airline_name, flight_num })], {
          type: "application/json",
        })
      );
      axios
        .post("/api/cancel-flight", formData)
        .then((res) => {
          if (res.data.code === 200) {
            message.success("Success!");
            setTimeout(() => {
              setFlights(
                flights.filter((item) => item.key !== selectedRowKeys[0])
              );
              setSelectedRowKeys([]);
            }, 1000);
          } else {
            message.error(res.data.message);
          }
        })
        .catch((err) => console.error(err));
    }
  };

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
                <h1 className="heading">Cancel Flight</h1>
              </Col>
              <Col span={24}>
                <Form form={form} name="cancel-flight" scrollToFirstError>
                  <Row justify="center">
                    <Col span={24} align="left">
                      <Form.Item name="current_date" label="Current Date">
                        <DatePicker defaultValue={today} disabled />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row justify="center" gutter={16}>
                    <Col span={14}>
                      <Form.Item name="airline_name" label="Airline">
                        <Select>
                          {airlines.map(({ airline_name }, i) => (
                            <Option key={i} value={airline_name}>
                              {airline_name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={10}>
                      <Form.Item name="flight_num" label="Flight Number">
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Col>
              <Col span={24}>
                <Table
                  dataSource={flights}
                  columns={columns}
                  rowSelection={{ type: "radio", ...rowSelection }}
                  pagination={{ pageSize: "5", hideOnSinglePage: true }}
                ></Table>
              </Col>
              <Col span={24}>
                <Row justify="center" gutter={16}>
                  <Col>
                    <Button>
                      <Link
                        to={{
                          pathname: "/customer/home",
                          state: { email: location.state.email },
                        }}
                      >
                        Back
                      </Link>
                    </Button>
                  </Col>
                  <Col>
                    <Button type="primary" onClick={handleCancel}>
                      Cancel Flight
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default CancelFlight;

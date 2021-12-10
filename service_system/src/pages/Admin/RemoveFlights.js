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
  Button,
  Space,
} from "antd";
import moment from "moment";
import FlightList from "../../components/FlightList";
import axios from "axios";
import { Content } from "antd/lib/layout/layout";

const { RangePicker } = DatePicker;
const { Option } = Select;

const today = moment();
const dateFormat = "YYYY-MM-DD";

function RemoveFlights() {
  const location = useLocation();
  const [form] = Form.useForm();
  const [airlines, setAirlines] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);

  useEffect(() => {
    axios.get("/api/airlines").then((res) => setAirlines(res.data.data));
  }, []);

  const handleReset = () => {};
  const handleRemove = () => {
    if (selectedFlight) {
      console.log(selectedFlight);
    }
  };

  const buttons = [
    {
      label: "Reset",
      type: "default",
      onClick: handleReset,
    },
    {
      label: "Filter",
      type: "default",
    },
    {
      label: "Remove",
      type: "primary",
      onClick: handleRemove,
    },
  ];

  return (
    <Layout style={{minHeight : "100vh"}}>
      <Content style={{ margin: '24px 24px 24px', background: "white"}}>
            <Row justify="center" align="middle" style={{margin: '24px 24px 24px'}}>
                <Col xs={22} sm={20} md={16} lg={15} xl={15} xxl={15}>
                    <Row justify="center" align="middle" gutter={[24, 24]} >
                      <Col span={24} align="middle">
                          <h2>Now logged in as {location.state.email}</h2>
                          <h1>Remove Flights</h1>
                      </Col>
                      <Col span={24} align="middle">
                        <Form
                          style={{ maxWidth: "100%" }}
                          form={form}
                          name="remove-flight"
                          scrollToFirstError
                        >
                          <Row justify="center" align="middle" gutter={[36, 36]} >
                            <Col span={12} align="middle">
                              <Form.Item
                                name="dates"
                                label="Dates"
                                rules={[{ required: true, message: "Please enter dates." }]}
                              >
                                <RangePicker
                                    disabledDate={(d) =>
                                        !d || d.format(dateFormat) <= today.format(dateFormat)
                                    }
                                    style={{width: "100%"}}
                                />
                              </Form.Item>
                            </Col>
                            <Col span={12} align="middle">
                              <Form.Item name="airline_name" label="Airline">
                                <Select style={{width: "100%"}}>
                                  {airlines.map((airline, i) => (
                                    <Option value={airline.airline_name}>{airline.airline_name}</Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </Col>
                            <Col span={12} align="middle">
                              <Form.Item name="current_date" label="Current Date">
                                <DatePicker
                                  defaultValue={moment(today, "YYYY-MM-DD")}
                                  disabled
                                  style={{width: "100%"}}
                                />
                              </Form.Item>
                            </Col>
                            <Col span={12} align="middle">
                              <Form.Item name="flight_num" label="Flight Number">
                                <Input style={{width: "100%"}}/>
                              </Form.Item>
                            </Col>
                            <Col span={24} align="middle">
                              <FlightList />
                            </Col>
                            <Col span={24} align="middle">
                              <Space size="large">
                              <Form.Item>
                                <Button>
                                  <Link
                                      to={{
                                        pathname: "/admin/home",
                                        state: { email: location.state.email },
                                      }}
                                  >
                                    Back
                                  </Link>
                                </Button>
                                </Form.Item>
                                {buttons.map((button, i) => (
                                  <Form.Item>
                                    <Button type={button.type} onClick={button.onClick}>
                                      {button.label}
                                    </Button>
                                  </Form.Item>
                                ))}
                              </Space>
                            </Col>
                          </Row>
                        </Form>
                      </Col>
                    </Row>
                </Col>
            </Row>
      </Content>
    </Layout>
  );
}

export default RemoveFlights;

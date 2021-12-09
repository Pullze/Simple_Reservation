import React, { useState, useEffect } from "react";
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
import { useLocation } from "react-router";

const { RangePicker } = DatePicker;
const { Option } = Select;

const today = new Date();

const buttons = [
  {
    label: "Back",
    type: "default",
    htmlType: "button",
  },
  {
    label: "Reset",
    type: "default",
    htmlType: "reset",
  },
  {
    label: "Filter",
    type: "default",
    htmlType: "button",
  },
  {
    label: "Remove",
    type: "primary",
    htmlType: "submit",
  },
];

function RemoveFlights() {
  const [form] = Form.useForm();
  const [airlines, setAirlines] = useState([]);
  const location = useLocation();

  useEffect(() => {
    axios.get("/api/airlines").then((res) => setAirlines(res.data.data));
  }, []);

  const onFinish = (values) => {
    console.log("Success:", values);
  };

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
                          onFinish={onFinish}
                          scrollToFirstError
                        >
                          <Row justify="center" align="middle" gutter={[24, 24]} >
                            <Col span={12} align="middle">
                              <Form.Item
                                name="dates"
                                label="Dates"
                                rules={[{ required: true, message: "Please enter dates." }]}
                              >
                                <RangePicker style={{width: "100%"}}/>
                              </Form.Item>
                            </Col>
                            <Col span={12} align="middle">
                              <Form.Item name="airline" label="Airline">
                                <Select style={{width: "100%"}}>
                                  {airlines.map((airline, i) => (
                                    <Option value={airline.name}>{airline.name}</Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </Col>
                            <Col span={12} align="middle">
                              <Form.Item name="current-date" label="Current Date">
                                <DatePicker
                                  defaultValue={moment(today, "YYYY-MM-DD")}
                                  disabled
                                  style={{width: "100%"}}
                                />
                              </Form.Item>
                            </Col>
                            <Col span={12} align="middle">
                              <Form.Item name="flight-num" label="Flight Number">
                                <Input style={{width: "100%"}}/>
                              </Form.Item>
                            </Col>
                            <Col span={24} align="middle">
                              <FlightList />
                            </Col>
                            <Col span={24} align="middle">
                              <Space>
                                {buttons.map((button, i) => (
                                  <Form.Item>
                                    <Button type={button.type} htmlType={button.htmlType}>
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

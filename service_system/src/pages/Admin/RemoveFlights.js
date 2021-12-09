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
} from "antd";
import moment from "moment";
import FlightList from "../../components/FlightList";
import axios from "axios";

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
    <Layout>
      <Row
        style={{ minHeight: "100vh", paddingTop: "10%" }}
        justify="center"
        align="top"
      >
        <Col span={24} align="middle">
          <h2>Now logged in as {location.state.email}</h2>
        </Col>
        <Col className="heading" span={24} align="middle">
          Remove Flight
        </Col>
        <Col span={24} align="middle">
          <Form
            style={{ maxWidth: "300px" }}
            form={form}
            name="remove-flight"
            scrollToFirstError
          >
            <Col span={24} align="middle">
              <Form.Item name="dates" label="Dates">
                <RangePicker
                  disabledDate={(d) =>
                    !d || d.format(dateFormat) <= today.format(dateFormat)
                  }
                />
              </Form.Item>
              <Form.Item name="airline_name" label="Airline">
                <Select>
                  {airlines.map((airline, i) => (
                    <Option value={airline.name}>{airline.name}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="current_date" label="Current Date">
                <DatePicker defaultValue={today} disabled />
              </Form.Item>
            </Col>
            <Form.Item name="flight_num" label="Flight Number">
              <Input />
            </Form.Item>
            <FlightList />
            <Row className="buttons" style={{ marginTop: "5%" }}>
              <Col span={6}>
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
              </Col>
              {buttons.map((button, i) => (
                <Col key={i} span={6}>
                  <Form.Item>
                    <Button type={button.type} onClick={button.onClick}>
                      {button.label}
                    </Button>
                  </Form.Item>
                </Col>
              ))}
            </Row>
          </Form>
        </Col>
      </Row>
    </Layout>
  );
}

export default RemoveFlights;

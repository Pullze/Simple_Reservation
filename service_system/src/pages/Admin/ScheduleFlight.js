import React, { useState, useEffect } from "react";
import {
  Layout,
  Row,
  Col,
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  TimePicker,
  Button,
} from "antd";
import moment from "moment";
import axios from "axios";

const { Option } = Select;

const today = new Date();
const yesterday = today;
yesterday.setDate(today.getDate() - 1);

function ScheduleFlight() {
  const [form] = Form.useForm();
  const [airlines, setAirlines] = useState([]);

  useEffect(() => {
    axios.get("/api/airlines").then((res) => setAirlines(res.data));
  }, []);

  const onFinish = (fieldsValue) => {
    console.log(fieldsValue["arrival-time"]);
    const values = {
      ...fieldsValue,
      "departure-time": fieldsValue["departure-time"].format("HH:mm:ss"),
      "arrival-time": fieldsValue["arrival-time"].format("HH:mm:ss"),
      "flight-date": fieldsValue["flight-date"].format("YYYY-MM-DD"),
      "current-date": today.toISOString().slice(0, 10),
    };
    console.log("Success:", values);
  };

  const formItems = [
    {
      name: "flight-num",
      label: "Flight Number",
      rules: [{ required: true, message: "Please enter the flight number." }],
      input: <InputNumber type="number" controls={false} />,
    },
    {
      name: "airline",
      label: "Airline",
      rules: [{ required: true, message: "Please select the airline." }],
      input: (
        <Select>
          {airlines.map((airline, i) => (
            <Option key={i} value={airline.name}>
              {airline.name}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      name: "from-airport",
      label: "From Airport",
      rules: [{ required: true, message: "Please enter the from airport ID." }],
      input: <Input />,
    },
    {
      name: "to-airport",
      label: "To Airport",
      rules: [
        { required: true, message: "Please enter the to airport ID." },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue("from-airport") !== value) {
              return Promise.resolve();
            }
            return Promise.reject(
              new Error("To airport must not be the same as from airport.")
            );
          },
        }),
      ],
      input: <Input />,
    },
    {
      name: "departure-time",
      label: "Departure Time",
      rules: [{ required: true, message: "Please enter the departure time." }],
      input: <TimePicker />,
    },
    {
      name: "arrival-time",
      label: "Arrival Time",
      rules: [{ required: true, message: "Please enter the arrival time." }],
      input: <TimePicker />,
    },
    {
      name: "flight-date",
      label: "Flight Date",
      rules: [{ required: true, message: "Please enter the flight date." }],
      input: <DatePicker disabledDate={(d) => !d || d.isBefore(yesterday)} />,
    },
    {
      name: "cost",
      label: "Cost",
      rules: [{ required: true, message: "Please enter the cost per person" }],
      input: (
        <InputNumber
          addonBefore="$"
          addonAfter="per person"
          type="number"
          min={0}
          controls={false}
        />
      ),
    },
    {
      name: "capacity",
      label: "Capacity",
      rules: [{ required: true, message: "Please enter the flight capacity." }],
      input: <InputNumber type="number" min={0} controls={false} />,
    },
    {
      name: "current-date",
      label: "Current Date",
      rules: [],
      input: <DatePicker defaultValue={moment(today, "YYYY-MM-DD")} disabled />,
    },
  ];

  return (
    <Layout>
      <Row style={{ minHeight: "100vh" }} align="middle">
        <Col className="heading" span={24} align="middle">
          Schedule Flight
        </Col>
        <Col span={24} align="middle">
          <Form
            style={{ maxWidth: "300px" }}
            form={form}
            name="schedule-flight"
            onFinish={onFinish}
            scrollToFirstError
          >
            {formItems.map((formItem, i) => (
              <Form.Item
                key={i}
                name={formItem.name}
                label={formItem.label}
                dependencies={
                  formItem.name === "to-airport" ? ["from-airport"] : []
                }
                rules={formItem.rules}
              >
                {formItem.input}
              </Form.Item>
            ))}
            <Form.Item>
              <Button htmlType="reset">Cancel</Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Schedule
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Layout>
  );
}

export default ScheduleFlight;

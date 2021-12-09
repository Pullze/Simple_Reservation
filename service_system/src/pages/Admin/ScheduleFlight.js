import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import {
  Layout,
  Space,
  Row,
  Col,
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  TimePicker,
  Button,
  message,
  Result,
  Descriptions,
  PageHeader,
} from "antd";
import { Content } from "antd/lib/layout/layout";
import moment from "moment";
import axios from "axios";

const { Option } = Select;

const today = moment();

const dateFormat = "YYYY-MM-DD";
const timeFormat = "HHmmss";

const fieldLabel = {
  flight_num: "Flight Number",
  airline_name: "Airline",
  from_airport: "From Airport",
  to_airport: "To Airport",
  departure_time: "Departure Time",
  arrival_time: "Arrival Time",
  flight_date: "Flight Date",
  cost: "Cost",
  capacity: "Capacity",
  current_date: "Current Date",
};

function ScheduleFlight() {
  const location = useLocation();
  const [form] = Form.useForm();
  const [airlines, setAirlines] = useState([]);
  const [flight, setFlight] = useState({ isScheduled: false });

  useEffect(() => {
    axios.get("/api/airlines").then((res) => setAirlines(res.data.data));
  }, []);

  const scheduleFlight = (values) => {
    const flight = {
      ...values,
      departure_time: values["departure_time"].format(timeFormat),
      arrival_time: values["arrival_time"].format(timeFormat),
      flight_date: values["flight_date"].format(dateFormat),
      current_date: today.format(dateFormat),
    };
    console.log("Success:", flight);
    const formData = new FormData();
    formData.append(
      "jsonValue",
      new Blob([JSON.stringify(flight)], { type: "application/json" })
    );
    axios
      .post("/api/schedule_flight", formData)
      .then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          message.success("Successfully scheduled flight!");
          setTimeout(() => {
            setFlight({
              ...res.data.data,
              isScheduled: true,
            });
          }, 1000);
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleClick = () => {
    window.location.reload();
  };

  const formItems = [
    {
      name: "flight_num",
      rules: [{ required: true, message: "Please enter the flight number." }],
      input: (
        <InputNumber type="number" controls={false} style={{ width: "100%" }} />
      ),
    },
    {
      name: "airline_name",
      rules: [{ required: true, message: "Please select the airline." }],
      input: (
        <Select>
          {airlines.map((airline, i) => (
            <Option
              key={i}
              value={airline.airline_name}
              style={{ width: "100%" }}
            >
              {airline.airline_name}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      name: "from_airport",
      rules: [{ required: true, message: "Please enter the from airport ID." }],
      input: <Input style={{ width: "100%" }} />,
    },
    {
      name: "to_airport",
      rules: [
        { required: true, message: "Please enter the to airport ID." },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue("from_airport") !== value) {
              return Promise.resolve();
            }
            return Promise.reject(
              new Error("To airport must not be the same as from airport.")
            );
          },
        }),
      ],
      input: <Input style={{ width: "100%" }} />,
    },
    {
      name: "departure_time",
      rules: [{ required: true, message: "Please enter the departure time." }],
      input: <TimePicker style={{ width: "100%" }} />,
    },
    {
      name: "arrival_time",
      rules: [{ required: true, message: "Please enter the arrival time." }],
      input: <TimePicker style={{ width: "100%" }} />,
    },
    {
      name: "flight_date",
      rules: [{ required: true, message: "Please enter the flight date." }],
      input: (
        <DatePicker
          disabledDate={(d) =>
            !d || d.format(dateFormat) <= today.format(dateFormat)
          }
          style={{ width: "100%" }}
        />
      ),
    },
    {
      name: "cost",
      rules: [
        { required: true, message: "Please enter the cost per person" },
        () => ({
          validator(_, value) {
            if (value === null || (value >= 0 && value <= 9999.99)) {
              return Promise.resolve();
            }
            return Promise.reject(
              new Error("Flight cost must be between 0.00 and 9999.99.")
            );
          },
        }),
      ],
      input: (
        <InputNumber
          addonBefore="$"
          addonAfter="per person"
          type="number"
          controls={false}
          style={{ width: "100%" }}
        />
      ),
    },
    {
      name: "capacity",
      rules: [
        { required: true, message: "Please enter the flight capacity." },
        () => ({
          validator(_, value) {
            console.log(value);
            if (value === null || value > 0) {
              return Promise.resolve();
            }
            return Promise.reject(
              new Error("Flight capacity must be greater than 0.")
            );
          },
        }),
      ],
      input: (
        <InputNumber type="number" controls={false} style={{ width: "100%" }} />
      ),
    },
    {
      name: "current_date",
      rules: [],
      input: (
        <DatePicker defaultValue={today} disabled style={{ width: "100%" }} />
      ),
    },
  ];

  if (flight.isScheduled) {
    return (
      <Layout style={{ minHeight: "100vh" }} align="middle">
        <PageHeader
          onBack={() => window.location.reload()}
          title="Schedule Another Flight"
        >
          <Result status="success" title="Successfully scheduled a flight!" />
          <Row justify="center">
            <Col>
              <Descriptions bordered size="default" column={1}>
                {Object.entries(fieldLabel).map(([name, label], i) => (
                  <Descriptions.Item label={label}>
                    {flight[name]}
                  </Descriptions.Item>
                ))}
              </Descriptions>
            </Col>
          </Row>
        </PageHeader>
      </Layout>
    );
  }

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
              </Col>
              <Col span={24} align="middle">
                <h1>Schedule Flights</h1>
              </Col>
              <Col span={24} align="middle">
                <Form
                  style={{ maxWidth: "100%" }}
                  form={form}
                  name="schedule-flight"
                  onFinish={scheduleFlight}
                  scrollToFirstError
                >
                  <Row gutter={[36, 36]}>
                    {formItems.map((formItem, i) => (
                      <Col span={12}>
                        <Form.Item
                          key={i}
                          name={formItem.name}
                          label={fieldLabel[formItem.name]}
                          dependencies={
                            formItem.name === "to_airport"
                              ? ["from_airport"]
                              : []
                          }
                          rules={formItem.rules}
                        >
                          {formItem.input}
                        </Form.Item>
                      </Col>
                    ))}
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
                        <Form.Item>
                          <Button type="primary" htmlType="submit">
                            Schedule
                          </Button>
                        </Form.Item>
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

export default ScheduleFlight;

import React from "react";
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
import airlines from "../../constants/Airlines";
import FlightList from "../../components/FlightList";

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

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <Layout>
      <Row
        style={{ minHeight: "100vh", paddingTop: "10%" }}
        justify="center"
        align="top"
      >
        <Col className="heading" span={24} align="middle">
          Remove Flight
        </Col>
        <Col span={24} align="middle">
          <Form
            style={{ maxWidth: "300px" }}
            form={form}
            name="remove-flight"
            onFinish={onFinish}
            scrollToFirstError
          >
            <Col span={24} align="middle">
              <Form.Item
                name="dates"
                label="Dates"
                rules={[{ required: true, message: "Please enter dates." }]}
              >
                <RangePicker />
              </Form.Item>
              <Form.Item name="airline" label="Airline">
                <Select>
                  {airlines.map((airline, i) => (
                    <Option value={airline.value}>{airline.label}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="current-date" label="Current Date">
                <DatePicker
                  defaultValue={moment(today, "YYYY-MM-DD")}
                  disabled
                />
              </Form.Item>
            </Col>
            <Form.Item name="flight-num" label="Flight Number">
              <Input />
            </Form.Item>
            <FlightList />
            <Row className="buttons">
              {buttons.map((button, i) => (
                <Col key={i} span={6}>
                  <Form.Item>
                    <Button type={button.type} htmlType={button.htmlType}>
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

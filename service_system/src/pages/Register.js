import React, { useState } from "react";
import { useHistory } from "react-router";
import "../config/config.js";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Layout,
  Tabs,
  Space,
  message,
} from "antd";
import axios from "axios";
import "./Register.css";

const { TabPane } = Tabs;

const today = new Date();

// Input field value validators
const validators = {
  phone: () => ({
    validator(_, value) {
      if (
        !value ||
        (value.length === 12 &&
          !isNaN(value.slice(0, 3)) &&
          value.charAt(3) === "-" &&
          !isNaN(value.slice(4, 7)) &&
          value.charAt(7) === "-" &&
          !isNaN(value.slice(8, 13)))
      ) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("Please enter a valid phone number."));
    },
  }),
  confirm_password: ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(
        new Error("The two passwords that you entered do not match!")
      );
    },
  }),
  card_number: () => ({
    validator(_, value) {
      if (
        !value ||
        (value.length === 19 &&
          !isNaN(value.slice(0, 4)) &&
          value.charAt(4) === " " &&
          !isNaN(value.slice(5, 9)) &&
          value.charAt(9) === " " &&
          !isNaN(value.slice(10, 14)) &&
          value.charAt(14) === " " &&
          !isNaN(value.slice(15, 19)))
      ) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("Please enter a valid card number."));
    },
  }),
  cvv: () => ({
    validator(_, value) {
      if (!value || (!isNaN(value) && value.length === 3)) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("Please enter a valid CVV."));
    },
  }),
  expiration_month: () => ({
    validator(_, value) {
      if (
        !value ||
        (value.length === 2 && parseInt(value) >= 1 && parseInt(value) <= 12)
      ) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("Please enter a valid month."));
    },
  }),
  expiration_year: () => ({
    validator(_, value) {
      if (
        !value ||
        (value.length === 2 && parseInt("20" + value) >= today.getFullYear())
      ) {
        return Promise.resolve();
      } else if (
        value.length === 2 &&
        !isNaN(value) &&
        parseInt("20" + value) < today.getFullYear()
      ) {
        return Promise.reject(new Error("This card has already expired."));
      } else {
        return Promise.reject(new Error("Please enter a valid year."));
      }
    },
  }),
};

function Register() {
  const history = useHistory();
  const [form] = Form.useForm();

  const registerCustomer = (values) => {
    console.log("Success:", values);
    const customer = {
      email: values["email"],
      first_name: values["first-name"],
      last_name: values["last-name"],
      pass: values["password"],
      phone_number: values["phone"],
      ccNumber: values["card-number"],
      cvv: values["cvv"],
      exp_date: `20${values["exp"].year}-${values["exp"].month}-01`,
      location: "", // FIXME
    };
    const formData = new FormData();
    formData.append(
      "jsonValue",
      new Blob([JSON.stringify(customer)], { type: "application/json" })
    );
    axios
      .post("/api/register_customer", formData)
      .then((res) => {
        message.success("Successfully registered!");
        setTimeout(
          () =>
            history.push({
              pathname: "/customer/home",
              state: {
                email: values["email"],
              },
            }),
          1000
        );
      })
      .catch((err) => message.error(err.response.data));
  };

  const registerOwner = (values) => {
    console.log("Success:", values);
    const owner = {
      email: values["email"],
      first_name: values["first-name"],
      last_name: values["last-name"],
      pass: values["password"],
      phone_number: values["phone"],
    };
    const formData = new FormData();
    formData.append(
      "jsonValue",
      new Blob([JSON.stringify(owner)], { type: "application/json" })
    );
    axios
      .post("/api/register_owner", formData)
      .then((res) => {
        message.success("Successfully registered!");
        setTimeout(
          () =>
            history.push({
              pathname: "/owner/home",
              state: {
                email: values["email"],
              },
            }),
          1000
        );
      })
      .catch((err) => message.error(err.response.data));
  };

  const basicFormItems = () => {
    return [
      <Form.Item
        key="0"
        name="first-name"
        label="First Name"
        rules={[
          {
            required: true,
            message: "Please input your first name!",
          },
        ]}
      >
        <Input />
      </Form.Item>,
      <Form.Item
        key="1"
        name="last-name"
        label="Last Name"
        rules={[
          {
            required: true,
            message: "Please input your last name!",
          },
        ]}
      >
        <Input />
      </Form.Item>,
      <Form.Item
        key="2"
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>,
      <Form.Item
        key="3"
        name="phone"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: "Please input your phone number!",
          },
          validators.phone,
        ]}
      >
        <Input addonBefore="+1" placeholder="xxx-xxx-xxxx" />
      </Form.Item>,
      <Form.Item
        key="4"
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>,
      <Form.Item
        key="5"
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          validators.confirm_password,
        ]}
      >
        <Input.Password />
      </Form.Item>,
    ];
  };

  return (
    <Layout>
      <Row
        style={{ minHeight: "100vh", paddingTop: "10%" }}
        justify="center"
        align="top"
      >
        <Col span={24} align="middle" style={{ width: "100%" }}>
          <h1 className="heading">Register Account</h1>
        </Col>
        <Col span={24} align="middle">
          <Tabs defaultActiveKey="1" type="card" centered>
            <TabPane tab="Customer" key="1">
              <Form
                form={form}
                name="register"
                className="register-form"
                onFinish={registerCustomer}
                scrollToFirstError
              >
                {[...basicFormItems()]}
                <Form.Item
                  name="card-number"
                  label="Card Number"
                  rules={[
                    {
                      required: true,
                      message: "Please input your card number!",
                    },
                    validators.card_number,
                  ]}
                >
                  <Input placeholder="xxxx xxxx xxxx xxxx" />
                </Form.Item>
                <Form.Item
                  name="cvv"
                  label="CVV"
                  rules={[
                    {
                      required: true,
                      message: "Please input your card's CVV!",
                    },
                    validators.cvv,
                  ]}
                >
                  <Input placeholder="cvv" />
                </Form.Item>
                <Form.Item label="Expiration Date">
                  <Input.Group compact>
                    <Form.Item
                      noStyle
                      name={["exp", "month"]}
                      rules={[
                        {
                          required: true,
                          message: "Please enter your card's expiration month.",
                        },
                        validators.expiration_month,
                      ]}
                    >
                      <Input style={{ width: "30%" }} placeholder="mm" />
                    </Form.Item>
                    <Form.Item
                      noStyle
                      name={["exp", "year"]}
                      rules={[
                        {
                          required: true,
                          message: "Please enter your card's expiration year.",
                        },
                        validators.expiration_year,
                      ]}
                    >
                      <Input style={{ width: "30%" }} placeholder="yy" />
                    </Form.Item>
                  </Input.Group>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Register
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane tab="Owner" key="2">
              <Form
                from={form}
                name="register"
                className="register-form"
                onFinish={registerOwner}
                scrollToFirstError
              >
                {[...basicFormItems()]}
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Register
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </Layout>
  );
}

export default Register;

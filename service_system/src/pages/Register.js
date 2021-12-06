import React from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
  message,
  Layout,
  Tabs,
  InputNumber,
} from "antd";
import "./Register.css";

const { Option } = Select;
const { TabPane } = Tabs;

function Register() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      +1
    </Form.Item>
  );

  //   const validateCardNumber = (cardNum) => {
  //       if (cardNum.length !== 16) {

  //       }
  //   }

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
        ]}
      >
        <Input />
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
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>,
    ];
  };

  return (
    <Layout>
      <Row style={{ minHeight: "100vh" }} justify="space-around" align="top">
        <Col span={24} align="middle">
          <Tabs className="tabs" defaultActiveKey="1" type="card" centered>
            <TabPane tab="Customer" key="1">
              <Form
                from={form}
                name="register"
                className="register-form"
                onFinish={onFinish}
                scrollToFirstError
              >
                {basicFormItems().map((item) => item)}
                <Form.Item
                  name="card-number"
                  label="Card Number"
                  rules={[
                    {
                      required: true,
                      message: "Please input your card number!",
                    },
                    {
                      max: 16,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="cvv"
                  label="CVV"
                  rules={[
                    {
                      required: true,
                      message: "Please input your card's CVV!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="exp"
                  label="Exp"
                  rules={[
                    {
                      required: true,
                      message: "Please input your card's expiration date!",
                    },
                  ]}
                >
                  <Input />
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
                onFinish={onFinish}
                scrollToFirstError
              >
                {basicFormItems().map((item) => item)}
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

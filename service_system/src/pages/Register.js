import React from "react";
import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  Select,
  Button,
  Row,
  Col,
  Layout,
  Tabs,
} from "antd";
import "./Register.css";

const { TabPane } = Tabs;
const { Option } = Select;

const months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

function Register() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

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
        <Input addonBefore="+1" />
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
          {
            min: 8,
            message: "Password must have at least 8 characters.",
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
      <Row
        style={{ minHeight: "100vh", paddingTop: "10%" }}
        justify="space-around"
        align="top"
      >
        <Col className="heading" span={24} align="middle">
          Register Account
        </Col>
        <Col span={24} align="middle">
          <Tabs defaultActiveKey="1" type="card" centered>
            <TabPane tab="Customer" key="1">
              <Form
                form={form}
                name="register"
                className="register-form"
                onFinish={onFinish}
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
                  <InputNumber
                    placeholder="cvv"
                    type="number"
                    controls={false}
                  />
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
                      ]}
                    >
                      <InputNumber
                        style={{ width: "30%" }}
                        placeholder="mm"
                        controls={false}
                        type="number"
                      />
                    </Form.Item>
                    <Form.Item
                      noStyle
                      name={["exp", "year"]}
                      rules={[
                        {
                          required: true,
                          message: "Please enter your card's expiration year.",
                        },
                      ]}
                    >
                      <InputNumber
                        style={{ width: "30%" }}
                        placeholder="yy"
                        controls={false}
                        type="number"
                      />
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
                onFinish={onFinish}
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

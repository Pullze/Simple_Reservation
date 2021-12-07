import React, { Component, useState } from "react";
import "../config/config.js";
import axios from "axios";
import { Form, Input, Button, Row, Col, message, Layout, Modal, Space } from "antd";
import { UserOutlined, LockOutlined, BlockOutlined } from "@ant-design/icons";
import "./Login.css";
import { useHistory } from 'react-router-dom';
import { Content } from "antd/lib/layout/layout";

export default function Login(props) {

  const history = useHistory();

  const state = useState;

  const [email, setEmail] = state("");
  const [password, setPass] = state("");
  const [visible, setIsVisible] = state(false);

  const showModal = () => {
    setIsVisible(true);
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

  function buttRedirect(where) {
    let myPath = where + "/home"
    message.success("Successfully logged in.");
    setTimeout(() =>  history.push({pathname: myPath, state: {
      email : email,
      who_am_i: where
    }}), 500);
  }

  const handleSubmit = () => {
   
    axios.get('/api/login', {
      params: {
        email : email,
        passwd : password
      }
    })
    .then((res) => {
      console.log(state);
      if (res.data.success) {
        if (res.data.is_admin) {
          buttRedirect("admin");
        } else if (res.data.is_client && res.data.is_owner) {
          console.log(visible)
          showModal();
        } else if (res.data.is_owner) {
          buttRedirect("owner");
        } else if (res.data.is_customer) {
          buttRedirect("customer");
        } else if (res.data.is_client) {
          buttRedirect("client");
        }
        
      } else {
        message.error("Login failed! Check your email and password.");
      }
     
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
      message.error("Connection Failed");
    })
  }

    return (
      <Layout>
        <Content>
          <Row
            style={{ minHeight: "100vh" }}
            justify="space-around"
            align="middle"
          >
            <Modal
              visible={visible}
              title="Alert"
              footer={[
              <Button key="back" onClick={()=>handleCancel()}>
                Cancel
              </Button>]}
              onCancel={()=>handleCancel()}
            >
          <p>It seems like you are both a customer and a owner, please select which panal you would like to go:</p>
          <Space>
            <Button onClick={()=>buttRedirect("owner")}> Owner Portal </Button>
            <Button onClick={()=>buttRedirect("customer")}> Customer Portal </Button>
          </Space>
        </Modal>
            <Col span={24} align="middle">
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                  remember: true,
                }}
              >
                <Form.Item
                  name="User Login"
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                >
                  <a href="/" style={{ color: "black", fontSize: "34px" }}>
                    Simple Reservation
                  </a>
                </Form.Item>
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Username!",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                    id="email"
                    onChange={e => setEmail(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password!",
                    },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    id="password"
                    onChange={e => setPass(e.target.value)}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    onClick={() => handleSubmit()}
                  >
                    Log in
                  </Button>
                  <p> </p>
                  <p
                    id="error"
                    style={{ fontWeight: "bold", color: "red" }}
                  ></p>
                </Form.Item>
              </Form>
              <Button
                type="primary"
                href="/register"
              >
                No account? Register
              </Button>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
}

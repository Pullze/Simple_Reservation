import React, { useState } from "react";
import "../config/config.js";
import axios from "axios";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  message,
  Layout,
  Modal,
  Space,
} from "antd";
import { UserOutlined, LockOutlined, BlockOutlined } from "@ant-design/icons";
import "./Login.css";
import { useHistory } from "react-router-dom";
import { Content } from "antd/lib/layout/layout";

export default function Login() {
  const history = useHistory();

  const [user, setUser] = useState({
    email: "",
    password: "",
    who_am_i: "",
  });

  const handleSubmit = () => {
    axios
      .get("/api/login", {
        params: {
          email: user.email,
          passwd: user.password,
        },
      })
      .then((res) => {
        console.log(user);
        if (res.data.success) {
          console.log("Successfully signed in.");
          var path = "/home";

          console.log(res.data.is_admin);
          if (res.data.is_admin === true) {
            path = "/admin" + path;
            setUser((current) => ({ ...current, who_am_i: "admin" }));
          } else if (res.data.is_client && res.data.is_owner) {
            alert("You are both customer and owner, IDK where to let you go!");
            //TODO: Add a popup to let user choose
            //FIX-ME
          } else if (res.data.is_owner === true) {
            path = "/owner" + path;
            setUser((current) => ({ ...current, who_am_i: "owner" }));
          } else if (res.data.is_customer === true) {
            path = "/customer" + path;
            setUser((current) => ({ ...current, who_am_i: "customer" }));
          } else if (res.data.is_client === true) {
            path = "/client" + path;
            setUser((current) => ({ ...current, who_am_i: "client" }));
          }

          if (path !== "/home") {
            message.success("Successfully logged in.");
            setTimeout(
              () =>
                history.push({
                  pathname: path,
                  state: {
                    email: user.email,
                    who_am_i: user.who_am_i,
                  },
                }),
              1000
            );
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
      });
  };

  return (
    <Layout>
      <Content>
        <Row
          style={{ minHeight: "100vh" }}
          justify="space-around"
          align="middle"
        >
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
                  onChange={(e) =>
                    setUser((current) => ({
                      ...current,
                      email: e.target.value,
                    }))
                  }
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
                  onChange={(e) =>
                    setUser((current) => ({
                      ...current,
                      password: e.target.value,
                    }))
                  }
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  onClick={handleSubmit}
                >
                  Log in
                </Button>
                <p> </p>
                <p id="error" style={{ fontWeight: "bold", color: "red" }}></p>
              </Form.Item>
            </Form>
            <p style={{ display: "inline", marginRight: "10px" }}>
              No account?
            </p>
            <Button
              type="primary"
              href="/register"
              onClick={console.log("click")}
            >
              Register
            </Button>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

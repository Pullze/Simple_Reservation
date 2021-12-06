import React, { Component } from 'react';
import '../config/config.js';
import axios from 'axios';
import { Form, Input, Button, Row, Col, message, Layout } from 'antd';
import { UserOutlined, LockOutlined, BlockOutlined } from '@ant-design/icons';
import './Login.css';
import { Content } from 'antd/lib/layout/layout';
import { Link } from 'react-router-dom';

export default class Login extends React.Component {
    
    onFinish = (values) => {
        console.log('Success:', values);
    }

    render() {
        return (
            <Layout>
              <Content>
                <Row style = {{ minHeight: '100vh' }} justify="space-around" align="middle">
                  <Col span={24} align="middle">
                      <Form
                      name="normal_login"
                      className="login-form"
                      initialValues={{
                        remember: true
                      }}
                      onFinish={this.onFinish}
                      >
                          <Form.Item
                              name="User Login"
                              rules={[
                                {
                                  required: false
                                }
                              ]}
                          >
                              <a href="/" style={{ color: 'black', fontSize: '36px' }}> Simple Reservation </a>
                          </Form.Item>
                          <Form.Item
                              name="username"
                              rules={[
                                {
                                  required: true,
                                  message: 'Please input your Username!'
                                }
                              ]}
                          >
                              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" id="adminEmail"/>
                          </Form.Item>
                          <Form.Item
                              name="password"
                              rules={[
                                {
                                  required: true,
                                  message: 'Please input your Password!'
                                }
                              ]}
                          >
                              <Input
                              prefix={<LockOutlined className="site-form-item-icon" />}
                              type="password"
                              placeholder="Password"
                              id="adminPassword"
                              />
                          </Form.Item>

                          <Form.Item>
                              <Button type="primary" htmlType="submit" className="login-form-button" onClick={console.log("click")}>
                              Log in
                              </Button>
                              <p> </p>
                              <p id = "error" style={{ fontWeight: 'bold', color: 'red' }}></p>
                          </Form.Item>
                      </Form>
                      <Button type="primary" href="/register" onClick={console.log("click")}> 
                          No account? Register
                      </Button>
                  </Col>
                </Row>
              </Content>
            </Layout>
        );
    }
}

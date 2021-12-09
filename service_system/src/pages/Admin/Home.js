import React, { useState } from "react";
import { Layout, Row, Col, Button } from "antd";
import "./Home.css";
import { useHistory, useLocation } from "react-router";
import { Content } from "antd/lib/layout/layout";
import { Link } from "react-router-dom";

const links = [
  {
    label: "Schedule Flight",
    path: "/admin/schedule-flight",
  },
  {
    label: "Remove Flight",
    path: "/admin/remove-flight",
  },
  {
    label: "Process Date",
    path: "/admin/process-date",
  },
  {
    label: "View Airports",
    path: "/admin/view-airport",
  },
  {
    label: "View Airlines",
    path: "/admin/view-airline",
  },
  {
    label: "View Flights",
    path: "/admin/view-flight",
  },
  {
    label: "View Customers",
    path: "/admin/view-customer",
  },
  {
    label: "View Owners",
    path: "/admin/view-owner",
  },
];

function Home(props) {
  const location = useLocation();
  console.log(location);
  return (
    <Layout>
      <Content style={{ margin: '24px 24px 24px', background: "white"}}>
        <Row className="admin-home-row" justify="space-around" align="middle" gutter={[24, 24]}>
          <Col span={24} align="middle">
            <h2>Now logged in as {location.state.email} </h2>
          </Col>
          <Col className="heading" span={24} align="middle">
            Admin Home
          </Col>
          {links.map((link, i) => (
            <Col className="item" key={i}  xxl={12} xl={12} md={12} sm={24} xs={24} align="middle">
              <Button type="default" href={link.path} style={{ minWidth: "150px", minHeight: "100%" }}> 
                <Link to={{pathname: link.path, state: {email : location.state.email}}}>
                  {link.label}
                </Link>
              </Button>
            </Col>
          ))}
          <Col span={24} align="middle">
            <Button type="default" danger href={"/"} style={{ minWidth: "150px", minHeight: "100%" }}> 
              Logout
            </Button>
        </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default Home;

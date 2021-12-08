import React, { useState } from "react";
import { Layout, Row, Col, Button } from "antd";
import "./Home.css";
import { useHistory } from "react-router";
import { Content } from "antd/lib/layout/layout";

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
    label: "Process Data",
    path: "/admin/process-data",
  },
  {
    label: "View Airports",
    path: "/admin/view-airports",
  },
  {
    label: "View Airlines",
    path: "/admin/view-airlines",
  },
  {
    label: "View Customers",
    path: "/admin/view-customers",
  },
  {
    label: "View Owners",
    path: "/admin/view-owners",
  },
];

function Home(props) {
  const history = useHistory(props);
  const historyState = history.location.state
  console.log(historyState);
  return (
    <Layout>
      <Content style={{ margin: '24px 24px 24px', background: "white"}}>
        <Row className="admin-home-row" justify="space-around" align="middle" gutter={[24, 24]}>
          <Col span={24} align="middle">
            <h2>Now logged in as {historyState.email} </h2>
          </Col>
          <Col className="heading" span={24} align="middle">
            Admin Home
          </Col>
          {links.map((link, i) => (
            <Col className="item" key={i}  xxl={12} xl={12} md={12} sm={24} xs={24} align="middle">
              <Button type="default" href={link.path} style={{ minWidth: "150px", minHeight: "100%" }}> 
                {link.label}
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

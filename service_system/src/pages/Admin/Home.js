import React, { useState } from "react";
import { Layout, Row, Col } from "antd";
import "./Home.css";
import { useHistory } from "react-router";

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
      <Row className="admin-home-row" justify="space-around" align="middle">
        <h2>Now logged in as {historyState.email} </h2>
        <Col className="heading" span={24} align="middle">
          Admin Home
        </Col>
        {links.map((link, i) => (
          <Col className="item" key={i} md={12} sm={24} xs={24} align="middle">
            <a href={link.path}>{link.label}</a>
          </Col>
        ))}
      </Row>
    </Layout>
  );
}

export default Home;

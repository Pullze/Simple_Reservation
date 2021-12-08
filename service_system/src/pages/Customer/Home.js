import React, { useState } from "react";
import { Layout, Row, Col, Button } from "antd";
import { useHistory } from "react-router";
import { Content } from "antd/lib/layout/layout";

const links = [
  {
    label: "Book Flight",
    path: "/customer/book-flight",
  },
  {
    label: "Cancel Flights",
    path: "/customer/cancel-flight",
  },
  {
    label: "View Properties",
    path: "/customer/view-properties",
  },
  {
    label: "Reserve Property",
    path: "/customer/reserve-property",
  },
  {
    label: "Cancel Reservation",
    path: "/customer/cancel-reservation",
  },
  {
    label: "Review Property",
    path: "/customer/review-property",
  },
  {
    label: "View Reservation",
    path: "/customer/view-reservation",
  },
  {
    label: "Rate Owner",
    path: "/customer/rate-owner",
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
            Customer Home
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

import React from "react";
import { Layout, Row, Col, Button } from "antd";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
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
    label: "View Reservations",
    path: "/customer/view-reservations",
  },
  {
    label: "Rate Owner",
    path: "/customer/rate-owner",
  },
];

function Home() {
  const location = useLocation();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ margin: "24px", background: "white" }}>
        <Row
          className="admin-home-row"
          justify="space-around"
          align="middle"
          gutter={[24, 24]}
        >
          <Col span={24} align="middle">
            <h2>Now logged in as {location.state.email} </h2>
          </Col>
          <Col className="heading" span={24} align="middle">
            Customer Home
          </Col>
          {links.map((link, i) => (
            <Col
              className="item"
              key={i}
              xxl={12}
              xl={12}
              md={12}
              sm={24}
              xs={24}
              align="middle"
            >
              <Button
                type="default"
                style={{ minWidth: "150px", minHeight: "100%" }}
              >
                <Link
                  to={{
                    pathname: link.path,
                    state: { email: location.state.email },
                  }}
                >
                  {link.label}
                </Link>
              </Button>
            </Col>
          ))}
          <Col span={24} align="middle">
            <Button
              type="default"
              danger
              href={"/"}
              style={{ minWidth: "150px", minHeight: "100%" }}
            >
              Logout
            </Button>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default Home;

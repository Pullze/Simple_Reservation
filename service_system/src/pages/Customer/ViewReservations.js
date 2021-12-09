import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Layout, Row, Col, Form, Input, Button, Table } from "antd";
import { Content } from "antd/lib/layout/layout";
import axios from "axios";

const columns = [
  {
    title: "Property Name",
    dataIndex: "property_name",
  },
  {
    title: "Start Date",
    dataIndex: "start_date",
  },
  {
    title: "End Date",
    dataIndex: "end_date",
  },
  {
    title: "Customer Email",
    dataIndex: "customer_email", //FIXME
  },
  {
    title: "Customer Phone #",
    dataIndex: "customer_phone", //FIXME
  },
  {
    title: "Cost",
    dataIndex: "cost", //FIXME
  },
  {
    title: "Review",
    dataIndex: "review", //FIXME
  },
  {
    title: "Rating",
    dataIndex: "rating", //FIXME
  },
];

function ViewReservations() {
  const location = useLocation();
  const [reservations, setReservations] = useState([]);
  const [owner, setOwner] = useState("");
  const [property, setProperty] = useState("");

  //   useEffect(() => {
  //     axios
  //       .get("api/reservations")
  //       .then((res) => setReservations(res.data.data))
  //       .catch((err) => console.error(err));
  //   }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ margin: "24px 24px 24px", background: "white" }}>
        <Row
          justify="center"
          align="middle"
          style={{ margin: "24px 24px 24px" }}
        >
          <Col xs={22} sm={20} md={16} lg={15} xl={15} xxl={15}>
            <Row justify="center" align="middle" gutter={[24, 24]}>
              <Col span={24} align="middle">
                <h2>Now logged in as {location.state.email}</h2>
                <h1 className="heading">View Property Reservations</h1>
              </Col>
              <Col span={24}>
                <Row justify="center" gutter={16}>
                  <Col>
                    <Form.Item name="owner_email" label="Owner Email">
                      <Input onChange={(value) => setOwner(value)} />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item name="property_name" label="Property">
                      <Input onChange={(value) => setProperty(value)} />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Table
                  dataSource={reservations.filter(
                    ({ owner_email, property_name }) =>
                      owner_email.includes(owner) &&
                      property_name.includes(property)
                  )}
                  columns={columns}
                />
              </Col>
              <Col span={24} align="left">
                <Button type="primary">
                  <Link
                    to={{
                      pathname: "/customer/home",
                      state: { email: location.state.email },
                    }}
                  >
                    Back
                  </Link>
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default ViewReservations;

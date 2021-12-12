import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Layout, Row, Col, Form, Input, Button, Table } from "antd";
import { Content } from "antd/lib/layout/layout";
import axios from "axios";
import moment from "moment";

const dateFormat = "MM/DD/YY";

const columns = [
  {
    title: "Property Name",
    dataIndex: "propertyName",
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
  },
  {
    title: "End Date",
    dataIndex: "endDate",
  },
  {
    title: "Customer Email",
    dataIndex: "customerEmail",
  },
  {
    title: "Customer Phone #",
    dataIndex: "customerPhone",
  },
  {
    title: "Cost",
    dataIndex: "cost",
  },
  {
    title: "Rating",
    dataIndex: "rating",
  },
];

function ViewReservations() {
  const location = useLocation();
  const [reservations, setReservations] = useState([]);
  const [owner, setOwner] = useState("");
  const [property, setProperty] = useState("");

  useEffect(() => {
    axios
      .get("/api/property_reservations")
      .then((res) =>
        setReservations(
          res.data.data.map((item, i) => ({
            ...item,
            key: i,
            startDate: moment(item.startDate).format(dateFormat),
            endDate: moment(item.endDate).format(dateFormat),
            cost: "$" + item.cost,
          }))
        )
      )
      .catch((err) => console.error(err));
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ margin: "24px 24px 24px", background: "white" }}>
        <Row
          justify="center"
          align="middle"
          style={{ margin: "24px 24px 24px" }}
        >
          <Col xs={22} sm={20} md={20} lg={20} xl={20} xxl={18}>
            <Row justify="center" align="middle" gutter={[24, 24]}>
              <Col span={24} align="middle">
                <h2>Now logged in as {location.state.email}</h2>
                <h1 className="heading">View Property Reservations</h1>
              </Col>
              <Col span={24}>
                <Row justify="center" gutter={16}>
                  <Col>
                    <Form.Item name="owner_email" label="Owner Email">
                      <Input onChange={(e) => setOwner(e.target.value)} />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item name="property_name" label="Property">
                      <Input onChange={(e) => setProperty(e.target.value)} />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Table
                  dataSource={reservations.filter(
                    (item) =>
                      item !== undefined &&
                      item.ownerEmail
                        .toLowerCase()
                        .includes(owner.toLowerCase()) &&
                      item.propertyName
                        .toLowerCase()
                        .includes(property.toLowerCase())
                  )}
                  columns={columns}
                  expandable={{
                    expandedRowRender: (record) => (
                      <p style={{ margin: 0 }}>
                        <span style={{ fontWeight: "bold" }}>Review: </span>
                        {record.review}
                      </p>
                    ),
                  }}
                  pagination={{ pageSize: 5 }}
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

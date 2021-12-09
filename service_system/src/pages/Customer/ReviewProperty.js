import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Layout, Row, Col, Table, Form, Input, Button, message } from "antd";
import axios from "axios";

function ReviewProperty() {
  const location = useLocation();
  const [form] = Form.useForm();
  const [properties, setProperties] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const columns = [
    {
      title: "Reservation Date",
      dataIndex: "", //FIXME
    },
    {
      title: "Property Name",
      dataIndex: "property_name",
    },
    {
      title: "Owner Email",
      dataIndex: "owner_email",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => setSelectedRowKeys(selectedRowKeys),
  };

  const handleSubmit = () => {};

  //   useEffect(() => {
  //     axios
  //       .get("/api/reservations", { params: { email: location.state.email } })
  //       .then((res) => setProperties(res.data.data))
  //       .catch((err) => console.error(err));
  //   }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Row justify="center" gutter={[0, 8]}>
        <Col span={24} align="middle">
          <h2>Now logged in as {location.state.email}</h2>
          <h1>Review Property</h1>
        </Col>
        <Col>
          <Table
            dataSource={properties}
            columns={columns}
            rowSelection={{ type: "radio", ...rowSelection }}
            pagination={{ pageSize: "5", hideOnSinglePage: true }}
          ></Table>
        </Col>
        <Col span={24}>
          <Form form={form} name="review-property" scrollToFirstError>
            <Row justify="center" gutter={8}>
              <Col span={24} align="middle">
                <Form.Item
                  name="content"
                  label="Comments"
                  style={{ width: "30%" }}
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
              <Col span={24} align="middle">
                <Form.Item name="score" label="Score" style={{ width: "10%" }}>
                  <Input />
                </Form.Item>
              </Col>
              <Col>
                <Row gutter={16}>
                  <Col>
                    <Button>
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
                  <Col>
                    <Button type="primary" onClick={handleSubmit}>
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Layout>
  );
}

export default ReviewProperty;

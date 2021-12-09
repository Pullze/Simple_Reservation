import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Layout, Row, Col, Table, Form, Input, Button, message } from "antd";
import { Content } from "antd/lib/layout/layout";
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

  const onFinish = (values) => {
    console.log("Success:", values);
    if (selectedRowKeys.length === 0) {
      return message.error("Please select a property to review.");
    }
    const { property_name, owner_email } = properties[selectedRowKeys[0]];
    const review = {
      property_name,
      owner_email,
      customer_email: location.state.email,
      content: values.content,
      score: values.scores,
    };
    const formData = new FormData();
    formData.append(
      "jsonValue",
      new Blob([JSON.stringify(review)], { type: "application/json" })
    );
    axios.post("/api/review-property", formData).then((res) => {
      if (res.data.code === 200) {
        message.success("Successfully submitted review!");
        setTimeout(() => {
          setProperties(
            properties.filter(({ key }) => key !== selectedRowKeys[0])
          );
          setSelectedRowKeys([]);
        }, 1000);
      }
    });
  };

  //   useEffect(() => {
  //     axios
  //       .get("/api/reservations", { params: { email: location.state.email } })
  //       .then((res) => setProperties(res.data.data))
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
                <h1 className="heading">Review Property</h1>
              </Col>
              <Col span={24}>
                <Table
                  dataSource={properties}
                  columns={columns}
                  rowSelection={{ type: "radio", ...rowSelection }}
                  pagination={{ pageSize: "5", hideOnSinglePage: true }}
                ></Table>
              </Col>
              <Col span={24}>
                <Form
                  form={form}
                  name="review-property"
                  onFinish={onFinish}
                  scrollToFirstError
                >
                  <Row justify="center" gutter={8}>
                    <Col span={24} align="middle">
                      <Form.Item
                        name="content"
                        label="Comments"
                        style={{ width: "80%" }}
                      >
                        <Input.TextArea
                          value={"123"}
                          autoSize={{ minRows: 3, maxRows: 12 }}
                          showCount
                          maxLength={500}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={24} align="middle">
                      <Form.Item
                        name="score"
                        label="Score"
                        style={{ width: "30%" }}
                        rules={[
                          {
                            required: true,
                            message: "Please enter a score evaluation.",
                          },
                          () => ({
                            validator(_, value) {
                              if (
                                !value ||
                                (!isNaN(value) && value >= 1 && value <= 5)
                              ) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                new Error(
                                  "Please enter a number between 1 and 5."
                                )
                              );
                            },
                          }),
                        ]}
                      >
                        <Input value={"1"} />
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
                          <Form.Item>
                            <Button type="primary" htmlType="submit">
                              Submit
                            </Button>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default ReviewProperty;

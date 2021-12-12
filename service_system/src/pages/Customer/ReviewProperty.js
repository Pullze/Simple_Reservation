import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import {
  Layout,
  Row,
  Col,
  Table,
  Form,
  Input,
  Button,
  Modal,
  Result,
  Empty,
  message,
} from "antd";
import { Content } from "antd/lib/layout/layout";
import axios from "axios";
import moment from "moment";

const today = moment();

function ReviewProperty() {
  const location = useLocation();
  const [form] = Form.useForm();
  const [reservations, setReservations] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [review, setReview] = useState({
    propertyName: null,
    isReviewed: false,
  });

  const columns = [
    {
      title: "Reservation Date",
      dataIndex: "startDate", //FIXME
    },
    {
      title: "Property Name",
      dataIndex: "propertyName",
    },
    {
      title: "Owner Email",
      dataIndex: "ownerEmail",
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
    if (selectedRowKeys.length === 0) {
      return message.error("Please select a property to review.");
    }
    const property = reservations.filter(
      ({ key }) => key === selectedRowKeys[0]
    )[0];
    const { propertyName, ownerEmail } = property;
    const review = {
      propertyName,
      ownerEmail,
      customerEmail: location.state.email,
      content: values.content === undefined ? "" : values.content,
      score: +values.score,
    };
    console.log(review);
    axios({
      method: "post",
      url: "/api/review_reservation",
      params: {
        propertyName,
        ownerEmail,
        customerEmail: location.state.email,
        content: values.content === undefined ? "" : values.content,
        score: +values.score,
      },
    })
      .then((res) => {
        if (res.data.code === 200) {
          setReview({ propertyName, isReviewed: true });
          setReservations(
            reservations.filter(({ key }) => key !== selectedRowKeys[0])
          );
          setSelectedRowKeys([]);
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    axios
      .get("/api/reservations_to_review", {
        params: { customerEmail: location.state.email },
      })
      .then((res) =>
        setReservations(res.data.data.map((item, i) => ({ ...item, key: i })))
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
          <Col xs={22} sm={20} md={16} lg={15} xl={15} xxl={15}>
            <Row justify="center" align="middle" gutter={[24, 24]}>
              <Col span={24} align="middle">
                <h2>Now logged in as {location.state.email}</h2>
                <h1 className="heading">Review Property</h1>
              </Col>
              <Col span={24}>
                <Table
                  dataSource={reservations}
                  columns={columns}
                  rowSelection={{ type: "radio", ...rowSelection }}
                  pagination={{ pageSize: "5", hideOnSinglePage: true }}
                  locale={{
                    emptyText: (
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="No more properties to review!"
                      />
                    ),
                  }}
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
                                (!isNaN(value) &&
                                  value.length === 1 &&
                                  +value >= 1 &&
                                  +value <= 5)
                              ) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                new Error(
                                  "Please enter an integer value between 1 and 5."
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
              <Modal
                visible={review.isReviewed}
                footer={[
                  <Button
                    onClick={() => setReview({ ...review, isReviewed: false })}
                  >
                    OK
                  </Button>,
                ]}
                onCancel={() => setReview({ ...review, isReviewed: false })}
              >
                <Result
                  status="success"
                  title={`You have successfully submitted a review for ${review.propertyName}.`}
                ></Result>
              </Modal>
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default ReviewProperty;

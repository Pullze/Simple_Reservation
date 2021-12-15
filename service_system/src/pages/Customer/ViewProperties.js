import React, {useEffect, useState} from "react";
import {Button, Col, Form, Input, Layout, Row, Spin, Table} from "antd";
import {Content} from "antd/lib/layout/layout";
import {useLocation} from "react-router";
import {Link} from "react-router-dom";
import axios from "axios";

const columns = [
  {
    title: "Name",
    dataIndex: "property_name",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "Avg. Rating",
    dataIndex: "rating",
  },
  {
    title: "Capacity",
    dataIndex: "capacity",
  },
  {
    title: "Cost",
    dataIndex: "cost",
    sorter: (a, b) => a - b,
  },
];

function ViewProperties() {
  const location = useLocation();
  const [form] = Form.useForm();
  const [properties, setProperties] = useState([]);
  const [bounds, setBounds] = useState({low: "", high: ""});
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    setLoading(true);
    setBounds({low: "", high: ""});
    form.resetFields();
    axios
      .get("/api/properties")
      .then((res) => {
        setProperties(res.data.data.map((item, i) => ({...item, key: i})));
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }

  const getProperties = () => {
    setLoading(true);
    const params = {};
    if (bounds.low.length > 0 && !isNaN(bounds.low)) {
      params.low = +bounds.low;
    }
    if (bounds.high.length > 0 && !isNaN(bounds.high)) {
      params.high = +bounds.high;
    }
    console.log(params);
    axios
      .get("/api/properties", {params})
      .then((res) => {
        setProperties(res.data.data.map((item, i) => ({...item, key: i})));
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getProperties();
  }, []);

  return (
    <Layout style={{minHeight: "100vh"}}>
      <Content style={{margin: "24px 24px 24px", background: "white"}}>
        <Row
          justify="center"
          align="middle"
          style={{margin: "24px 24px 24px"}}
        >
          <Col xs={22} sm={20} md={16} lg={15} xl={15} xxl={15}>
            <Row justify="center" align="middle" gutter={[16, 24]}>
              <Col span={24} align="middle">
                <h2>Now logged in as {location.state.email}</h2>
                <h1 className="heading">View Properties</h1>
              </Col>
              <Col span={24} align="middle">
                <Form form={form} name="view-properties" scrollToFirstError>
                  <Form.Item label="Capacity" style={{margin: 0}}>
                    <Input.Group compact>
                      <Form.Item
                        name="lowerbound"
                        rules={[
                          {
                            required: true,
                            message: "Please enter the lower bound.",
                          },
                          () => ({
                            validator(_, value) {
                              if (
                                !value ||
                                (!isNaN(value) &&
                                  value >= 0 &&
                                  !value.includes("."))
                              ) {
                                return Promise.resolve();
                              } else if (isNaN(value) || value.includes(".")) {
                                return Promise.reject(
                                  new Error("Please enter an integer value.")
                                );
                              } else {
                                return Promise.reject(
                                  new Error(
                                    "Capacity bound must not be neagtive."
                                  )
                                );
                              }
                            },
                          }),
                        ]}
                      >
                        <Input
                          style={{width: "30%"}}
                          onChange={(e) =>
                            setBounds((curr) => ({
                              ...curr,
                              low: e.target.value,
                            }))
                          }
                        />
                      </Form.Item>
                      -
                      <Form.Item
                        name="upperbound"
                        dependencies={["lowerbound"]}
                        rules={[
                          {
                            required: true,
                            message: "Please enter the upper bound.",
                          },
                          ({getFieldValue}) => ({
                            validator(_, value) {
                              if (
                                !value ||
                                (!isNaN(value) &&
                                  +value >= 0 &&
                                  !value.includes(".") &&
                                  +value >= +getFieldValue("lowerbound"))
                              ) {
                                return Promise.resolve();
                              } else if (isNaN(value) || value.includes(".")) {
                                return Promise.reject(
                                  new Error("Please enter an integer value.")
                                );
                              } else if (value < 0) {
                                return Promise.reject(
                                  new Error(
                                    "Capacity bound must not be neagtive."
                                  )
                                );
                              } else {
                                return Promise.reject(
                                  new Error(
                                    "Upper bound must be equal to or greater than lower bound."
                                  )
                                );
                              }
                            },
                          }),
                        ]}
                      >
                        <Input
                          style={{width: "30%"}}
                          onChange={(e) =>
                            setBounds((curr) => ({
                              ...curr,
                              high: e.target.value,
                            }))
                          }
                        />
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Form>
              </Col>
              <Col span={24} align="left">
                <h3>Click '+' to read each property's description!</h3>
              </Col>
              <Col span={24}>
                <Spin spinning={loading}>
                  <Table
                    dataSource={properties}
                    columns={columns}
                    expandable={{
                      expandedRowRender: (record) => (
                        <p style={{margin: 0}}>{record.descr}</p>
                      ),
                    }}
                    pagination={{pageSize: "5"}}
                  />
                </Spin>
              </Col>
              <Col span={24}>
                <Row justify="center" gutter={16}>
                  <Col>
                    <Button>
                      <Link
                        to={{
                          pathname: "/customer/home",
                          state: {email: location.state.email},
                        }}
                      >
                        Back
                      </Link>
                    </Button>
                  </Col>
                  <Col>
                    <Button onClick={handleReset}> Reset </Button>
                  </Col>
                  <Col>
                    <Button type="primary" onClick={getProperties}>
                      Filter
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default ViewProperties;

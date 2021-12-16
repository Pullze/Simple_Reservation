import React, {useEffect, useState} from "react";
import {useLocation} from "react-router";
import {Link} from "react-router-dom";
import {
  Button,
  Col,
  Descriptions,
  Form,
  Input,
  InputNumber,
  Layout,
  message,
  Modal,
  Result,
  Row,
  Select,
  Space,
} from "antd";
import {Content} from "antd/lib/layout/layout";
import axios from "axios";
import states from "../../constants/StateAbbreviations";

const { Option } = Select;

function AddProperty() {
  const location = useLocation();
  const [form] = Form.useForm();
  const [airports, setAirports] = useState([]);
  const [property, setProperty] = useState({
    property_name: null,
    owner_email: null,
    isAdded: false,
  });

  const formItems = [
    {
      name: "property_name",
      label: "Name",
      rules: [
        { required: true, message: "Please enter property's name." },
        () => ({
          validator(_, value) {
            if (!value || value.length <= 50) {
              return Promise.resolve();
            }
            return Promise.reject(
              new Error("Property name must not exceed 50 characters.")
            );
          },
        }),
      ],
      input: <Input />,
    },
    {
      name: "descr",
      label: "Description",
      rules: [
        { required: true, message: "Please enter property's description." },
      ],
      input: <Input />,
    },
    {
      name: "street",
      label: "Street",
      rules: [
        { required: true, message: "Please enter property's street." },
        () => ({
          validator(_, value) {
            if (!value || value.length <= 50) {
              return Promise.resolve();
            }
            return Promise.reject(
              new Error("Street name must not exceed 50 characters.")
            );
          },
        }),
      ],
      input: <Input />,
    },
    {
      name: "city",
      label: "City",
      rules: [
        { required: true, message: "Please enter property's city." },
        () => ({
          validator(_, value) {
            if (!value || value.length <= 50) {
              return Promise.resolve();
            }
            return Promise.reject(
              new Error("City name must not exceed 50 characters.")
            );
          },
        }),
      ],
      input: <Input />,
    },
    {
      name: "state",
      label: "State",
      rules: [{ required: true, message: "Please enter property's state." }],
      input: (
        <Select showSearch>
          {states.map((state) => (
            <Select.Option value={state}>{state}</Select.Option>
          ))}
        </Select>
      ),
    },
    {
      name: "zip",
      label: "Zip",
      rules: [
        { required: true, message: "Please enter property's zip code." },
        () => ({
          validator(_, value) {
            if (
              !value ||
              (!isNaN(value) &&
                +value >= 0 &&
                !value.includes(".") &&
                value.length === 5)
            ) {
              return Promise.resolve();
            }
            return Promise.reject(new Error("Please enter a valid zip code."));
          },
        }),
      ],
      input: <Input />,
    },
    {
      name: "nearest_airport",
      label: "Nearest Airport",
      rules: [],
      input: (
        <Select defaultValue={null}>
          {airports.map(({ value, label }) => (
            <Select.Option value={value}>{label}</Select.Option>
          ))}
        </Select>
      ),
    },
    {
      name: "distance",
      label: "Distance to Airport",
      rules: [
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (
              (getFieldValue("nearest_airport") &&
                value !== undefined &&
                value !== null &&
                value > 0) ||
              !getFieldValue("nearest_airport")
            ) {
              return Promise.resolve();
            }
            if (
              getFieldValue("nearest_airport") &&
              (value === undefined || value === null)
            ) {
              return Promise.reject(
                new Error("You must provide a distance to the nearest airport.")
              );
            } else {
              return Promise.reject(
                new Error("Please enter a positve number.")
              );
            }
          },
        }),
      ],
      input: <InputNumber controls={false} style={{ width: "100%" }} />,
    },
    {
      name: "cost",
      label: "Cost",
      rules: [
        { required: true, message: "Please enter property's cost." },
        () => ({
          validator(_, value) {
            if (
              !value ||
              (value >= 0.0 &&
                value <= 9999.99 &&
                (!value.toString().includes(".") ||
                  value.toString().split(".")[1].length <= 2))
            ) {
              return Promise.resolve();
            }
            return Promise.reject(
              new Error(
                "Please enter a value between 0.00 and 9999.99 with no more than 2 decimal points."
              )
            );
          },
        }),
      ],
      input: <InputNumber controls={false} style={{ width: "100%" }} />,
    },
    {
      name: "capacity",
      label: "Capacity",
      rules: [
        { required: true, message: "Please enter property's capacity." },
        () => ({
          validator(_, value) {
            if (!value || (value > 0 && !value.toString().includes("."))) {
              return Promise.resolve();
            }
            return Promise.reject(
              new Error("Please enter a positive integer.")
            );
          },
        }),
      ],
      input: <InputNumber controls={false} style={{ width: "100%" }} />,
    },
  ];

  const onFinish = (values) => {
    const property = { ...values, owner_email: location.state.email };
    const { nearest_airport, distance } = values;
    if (nearest_airport) {
      property.nearestAirport = nearest_airport;
      property.distance = distance;
    }
    const formData = new FormData();
    formData.append(
      "jsonValue",
      new Blob([JSON.stringify(property)], { type: "application/json" })
    );
    axios.post("/api/owner_add_property", formData).then((res) => {
      if (res.data.code === 200) {
        setProperty({ ...res.data.data, isAdded: true });
      } else {
        message.error(res.data.message);
      }
    });
  };

  useEffect(() => {
    axios.get("/api/view_airport").then((res) =>
      setAirports([
        { value: null, label: "N/A" },
        ...res.data.data.map(({ airport_id }) => ({
          value: airport_id,
          label: airport_id,
        })),
      ])
    );
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
                <h1 className="heading">Add Property</h1>
              </Col>
              <Col span={24}>
                <Form
                  form={form}
                  name="add-property"
                  onFinish={onFinish}
                  scrollToFirstError
                >
                  <Row gutter={[36, 36]}>
                    {formItems.map((item, i) => (
                      <Col key={i} span={12}>
                        <Form.Item
                          name={item.name}
                          label={item.label}
                          rules={item.rules}
                          dependencies={
                            item.name === "distance" ? ["nearest_airport"] : []
                          }
                        >
                          {item.input}
                        </Form.Item>
                      </Col>
                    ))}
                    <Col span={24} align="middle">
                      <Space size="large">
                        <Form.Item>
                          <Button>
                            <Link
                              to={{
                                pathname: "/owner/home",
                                state: { email: location.state.email },
                              }}
                            >
                              Back
                            </Link>
                          </Button>
                        </Form.Item>
                        <Form.Item>
                          <Button type="default" htmlType="reset">
                            Reset
                          </Button>
                        </Form.Item>
                        <Form.Item>
                          <Button type="primary" htmlType="submit">
                            Add
                          </Button>
                        </Form.Item>
                      </Space>
                    </Col>
                  </Row>
                </Form>
              </Col>

              <Modal
                visible={property.isAdded}
                footer={[
                  <Button
                    onClick={() => setProperty({ ...property, isAdded: false })}
                  >
                    OK
                  </Button>,
                ]}
                onCancel={() => setProperty({ ...property, isAdded: false })}
              >
                <Result
                  status="success"
                  title={`You have successfully added a property.`}
                  extra={
                    <div style={{ background: "white" }}>
                      <Descriptions size="default" column={1} bordered>
                        <Descriptions.Item label="Property Name">
                          {property.property_name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Owner">
                          {property.owner_email}
                        </Descriptions.Item>
                      </Descriptions>
                    </div>
                  }
                />
              </Modal>
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default AddProperty;

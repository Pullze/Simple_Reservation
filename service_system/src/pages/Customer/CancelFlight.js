import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import {
  Layout,
  Row,
  Col,
  Form,
  Input,
  DatePicker,
  Select,
  Table,
  Button,
  Popconfirm,
  Modal,
  Result,
  Empty,
  message,
} from "antd";
import { Content } from "antd/lib/layout/layout";
import moment from "moment";
import axios from "axios";

const { Option } = Select;

const today = moment();

const columns = [
  {
    title: "Airline",
    dataIndex: "airline_name",
    sorter: (a, b) => a.airline_name.localeCompare(b.airline_name),
  },
  {
    title: "Flight Number",
    dataIndex: "flight_num",
    sorter: (a, b) => +a.flight_num - +b.flight_num,
  },
  {
    title: "Date",
    dataIndex: "flight_date",
    sorter: (a, b) => moment(a.flight_date) - moment(b.flight_date),
  },
  {
    title: "Number of Seats",
    dataIndex: "num_seats",
  },
];

function CancelFlight() {
  const location = useLocation();
  const [form] = Form.useForm();
  const [airlines, setAirlines] = useState([]);
  const [flights, setFlights] = useState([]);
  const [query, setQuery] = useState({ airline_name: "All", flight_num: "" });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [cancelledBooking, setCancelledBooking] = useState({
    airline_name: null,
    flight_num: null,
    is_cancelled: false,
  });

  useEffect(() => {
    axios
      .get("/api/airlines")
      .then((res) => setAirlines([{ airline_name: "All" }, ...res.data.data]))
      .catch((err) => console.error(err));
    axios
      .get("/api/customer_view_books", {
        params: {
          customer_email: location.state.email,
          currentDate: today.format("YYYY-MM-DD"),
        },
      })
      .then((res) =>
        setFlights(
          res.data.data.map((item, i) => ({
            ...item,
            key: i,
          }))
        )
      )
      .catch((err) => console.error(err));
  }, []);

  const handleCancel = () => {
    if (selectedRowKeys.length === 0) {
      message.error("Please select a flight.");
    } else {
      const flight = flights.filter(({ key }) => key === selectedRowKeys[0])[0];
      const { airline_name, flight_num } = flight;
      axios({
        method: "post",
        url: "/api/cancel_flight",
        params: {
          airline_name,
          flight_num,
          customer_email: location.state.email,
        },
      }).then((res) => {
        if (res.data.code === 200) {
          setCancelledBooking({ airline_name, flight_num, is_cancelled: true });
          setFlights(flights.filter(({ key }) => key !== selectedRowKeys[0]));
          setSelectedRowKeys([]);
        } else {
          message.error(res.data.message);
        }
      });
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => setSelectedRowKeys(selectedRowKeys),
  };

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
                <h1 className="heading">Cancel Flight</h1>
              </Col>
              <Col span={24}>
                <Form form={form} name="cancel-flight" scrollToFirstError>
                  <Row justify="center">
                    <Col span={24} align="left">
                      <Form.Item name="current_date" label="Current Date">
                        <DatePicker defaultValue={today} disabled />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row justify="center" gutter={16}>
                    <Col span={14}>
                      <Form.Item name="airline_name" label="Airline">
                        <Select
                          showSearch
                          defaultValue={"All"}
                          onChange={(value) =>
                            setQuery({ ...query, airline_name: value })
                          }
                        >
                          {airlines.map(({ airline_name }, i) => (
                            <Option key={i} value={airline_name}>
                              {airline_name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={10}>
                      <Form.Item name="flight_num" label="Flight Number">
                        <Input
                          onChange={(e) =>
                            setQuery({ ...query, flight_num: e.target.value })
                          }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Col>
              <Col span={24}>
                <Table
                  dataSource={flights.filter(
                    (item) =>
                      item !== undefined &&
                      (query.airline_name === "All" ||
                        item.airline_name
                          .toLowerCase()
                          .includes(query.airline_name.toLowerCase())) &&
                      item.flight_num
                        .toLowerCase()
                        .includes(query.flight_num.toLowerCase())
                  )}
                  columns={columns}
                  rowSelection={{ type: "radio", ...rowSelection }}
                  pagination={{ pageSize: "5", hideOnSinglePage: true }}
                  locale={{
                    emptyText: (
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="You don't have any future bookings!"
                      />
                    ),
                  }}
                />
              </Col>
              <Col span={24}>
                <Row justify="center" gutter={16}>
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
                    <Popconfirm
                      title="Are you sure to cancel this flight?"
                      onConfirm={handleCancel}
                      okText="Yes, cancel it"
                      cancelText="No"
                    >
                      <Button type="primary">Cancel Flight</Button>
                    </Popconfirm>
                  </Col>
                </Row>
              </Col>
              <Modal
                visible={cancelledBooking.is_cancelled}
                footer={[
                  <Button
                    onClick={() =>
                      setCancelledBooking({
                        ...cancelledBooking,
                        is_cancelled: false,
                      })
                    }
                  >
                    OK
                  </Button>,
                ]}
                onCancel={() =>
                  setCancelledBooking({
                    ...cancelledBooking,
                    is_cancelled: false,
                  })
                }
              >
                <Result
                  status="success"
                  title={`You have successfully cancelled your booking on ${cancelledBooking.airline_name} ${cancelledBooking.flight_num}.`}
                />
              </Modal>
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default CancelFlight;

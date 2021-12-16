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
  Button,
  Space,
  Table,
  message,
  Modal,
  Result,
  Popconfirm,
  Spin,
} from "antd";
import moment from "moment";
import axios from "axios";
import { Content } from "antd/lib/layout/layout";

const { RangePicker } = DatePicker;
const { Option } = Select;

const today = moment();
const dateFormat = "YYYY-MM-DD";

function RemoveFlights() {
  const location = useLocation();
  const [form] = Form.useForm();
  const [airlines, setAirlines] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [flights, setFlights] = useState([]);
  const [startDate, setStartDate] = useState(today.format(dateFormat));
  const [endDate, setEndDate] = useState("");
  const [airlineName, setAirlineName] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [modalState, setModalState] = useState("warning");
  const [modalTitle, setModalTitle] = useState("");
  const [visible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAirlines();
    getFlights();
  }, []);

  const handleReset = async () => {
    form.resetFields();
    setLoading(true);
    setEndDate("");
    setAirlineName("");
    setFlightNumber("");
    setSelectedRowKeys([]);
    setSelectedRow([]);
    setFlights([]);
    setStartDate(today.format(dateFormat));
    const res = await axios.get("/api/view_remove_flight", {
      params: {
        startDate: today.format(dateFormat),
        endDate: "",
        airlineName: "",
        flightNumber: "",
      },
    });
    setFlights(
      res.data.data.map((item, i) => ({
        ...item,
        key: i,
      }))
    );
    setLoading(false);
  };

  const showModal = () => {
    setIsVisible(true);
  };

  const handleCancel = () => {
    setIsVisible(false);
    handleReset();
  };

  const handleRemove = () => {
    if (selectedRowKeys.length === 0) {
      message.error("Please select a flight.");
    } else {
      axios
        .delete("/api/remove_flight", {
          params: {
            airlineName: selectedRow[0].airline_name,
            currentDate: today.format(dateFormat),
            flightNum: selectedRow[0].flight_number,
          },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.code === 200) {
            setModalState("success");
          } else {
            setModalState("error");
          }
          setModalTitle(res.data.message);
          showModal();
        });
    }
  };

  const selectAirline = (value) => {
    setAirlineName(value);
  };

  const getAirlines = async () => {
    const res = await axios.get("/api/airlines");
    res.data.data.unshift("");
    setAirlines(res.data.data);
  };

  const getFlights = async () => {
    setLoading(true);

    const res = await axios.get("/api/view_remove_flight", {
      params: {
        startDate: startDate,
        endDate: endDate,
        airlineName: airlineName,
        flightNumber: flightNumber,
      },
    });

    const flights = await res.data.data;
    setFlights(
      flights.map((item, i) => ({
        ...item,
        key: i,
      }))
    );
    setLoading(false);
  };

  const columns = [
    {
      title: "Airline",
      dataIndex: "airline_name",
      key: "airline_name",
      sorter: {
        compare: (a, b) => a.airline_name.localeCompare(b.airline_name),
        multiple: 1,
      },
    },
    {
      title: "Flight Number",
      dataIndex: "flight_number",
      key: "flight_number",
      sorter: {
        compare: (a, b) => a.flight_number - b.flight_number,
        multiple: 1,
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: {
        compare: (a, b) =>
          parseInt(a.date.replaceAll("-", "")) -
          parseInt(b.date.replaceAll("-", "")),
        multiple: 1,
      },
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setSelectedRowKeys(selectedRowKeys);
      setSelectedRow(selectedRows);
    },
  };

  const buttons = [
    {
      label: "Reset",
      type: "reset",
      onClick: handleReset,
    },
    {
      label: "Filter",
      type: "default",
      onClick: getFlights,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ margin: "24px 24px 24px", background: "white" }}>
        <Row
          justify="center"
          align="middle"
          style={{ margin: "24px 24px 24px" }}
        >
          <Modal
            visible={visible}
            title="Alert"
            footer={
              modalState === "warning" && [
                <Button
                  key="back"
                  type="primary"
                  onClick={() => handleCancel()}
                >
                  OK
                </Button>,
              ]
            }
            onCancel={() => handleCancel()}
          >
            <Result status={modalState} title={modalTitle} />
          </Modal>
          <Col xs={22} sm={20} md={16} lg={15} xl={15} xxl={15}>
            <Row justify="center" align="middle" gutter={[24, 24]}>
              <Col span={24} align="middle">
                <h2>Now logged in as {location.state.email}</h2>
                <h1 className="heading">Remove Flights</h1>
              </Col>
              <Col span={24} align="middle">
                <Form
                  style={{ maxWidth: "100%" }}
                  form={form}
                  name="remove-flight"
                  scrollToFirstError
                >
                  <Row justify="center" align="middle" gutter={[24, 24]}>
                    <Col span={12} align="middle">
                      <Form.Item
                        name="dates"
                        label="Dates"
                        //rules={[{ required: true, message: "Please enter dates." }]}
                      >
                        <RangePicker
                          disabledDate={(d) =>
                            !d ||
                            d.format(dateFormat) <= today.format(dateFormat)
                          }
                          style={{ width: "100%" }}
                          onChange={(date, dateString) => {
                            setStartDate(dateString[0]);
                            setEndDate(dateString[1]);
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12} align="middle">
                      <Form.Item name="airline_name" label="Airline">
                        <Select
                          style={{ width: "100%" }}
                          onChange={selectAirline}
                        >
                          {airlines.map((airline, i) => (
                            <Option value={airline.airline_name}>
                              {airline.airline_name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12} align="middle">
                      <Form.Item name="current_date" label="Current Date">
                        <DatePicker
                          defaultValue={moment(today, "YYYY-MM-DD")}
                          disabled
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12} align="middle">
                      <Form.Item name="flight_num" label="Flight Number">
                        <Input
                          style={{ width: "100%" }}
                          onChange={(e) => setFlightNumber(e.target.value)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={24} align="middle">
                      <Spin spinning={loading}>
                        <Table
                          dataSource={flights}
                          rowSelection={{ type: "radio", ...rowSelection }}
                          columns={columns}
                          pagination={{ pageSize: 6 }}
                        />
                      </Spin>
                    </Col>
                    <Col span={24} align="middle">
                      <Space size="large">
                        <Form.Item>
                          <Button>
                            <Link
                              to={{
                                pathname: "/admin/home",
                                state: { email: location.state.email },
                              }}
                            >
                              Back
                            </Link>
                          </Button>
                        </Form.Item>
                        {buttons.map((button, i) => (
                          <Form.Item>
                            <Button type={button.type} onClick={button.onClick}>
                              {button.label}
                            </Button>
                          </Form.Item>
                        ))}
                        <Form.Item>
                          <Popconfirm
                            title="Are you sure to delete this flight?"
                            onConfirm={handleRemove}
                          >
                            <Button type="default" danger>
                              {" "}
                              Remove{" "}
                            </Button>
                          </Popconfirm>
                        </Form.Item>
                      </Space>
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

export default RemoveFlights;

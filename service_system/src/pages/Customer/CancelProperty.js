import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import {
  Layout,
  Row,
  Col,
  Table,
  Form,
  DatePicker,
  Button,
  Popconfirm,
  message,
  Modal,
  Result,
  Empty,
} from "antd";
import { Content } from "antd/lib/layout/layout";
import axios from "axios";
import moment from "moment";

const today = moment();

function CancelProperty() {
  const location = useLocation();
  const [reservations, setReservations] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [canceledProperty, setCanceledProperty] = useState(null);

  const columns = [
    {
      title: "Reservation Date",
      dataIndex: "startDate",
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

  const handleCancel = () => {
    if (selectedRowKeys.length === 0) {
      message.error("Please select a reservation.");
    } else {
      const { propertyName, ownerEmail } = reservations.filter(
        ({ key }) => key === selectedRowKeys[0]
      )[0];
      axios({
        method: "post",
        url: "/api/cancel_reservation",
        params: {
          propertyName,
          ownerEmail,
          customerEmail: location.state.email,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.code === 200) {
            setCanceledProperty(propertyName);
            setReservations(
              reservations.filter(({ key }) => key !== selectedRowKeys[0])
            );
            setSelectedRowKeys([]);
          } else {
            message.error(res.data.message);
          }
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    axios
      .get("/api/customer_future_reservations", {
        params: {
          customerEmail: location.state.email,
          currentDate: today.format("YYYY-MM-DD"),
        },
      })
      .then((res) =>
        setReservations(
          res.data.data.map((item, i) => ({
            ...item,
            key: i,
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
          <Col xs={22} sm={20} md={20} lg={20} xl={15} xxl={15}>
            <Row justify="center" align="middle" gutter={[24, 24]}>
              <Col span={24} align="middle">
                <h2>Now logged in as {location.state.email}</h2>
                <h1 className="heading">Cancel Property Reservation</h1>
              </Col>
              <Col span={24}>
                <Form.Item label="Current Date">
                  <DatePicker disabled defaultValue={today} />
                </Form.Item>
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
                        description="You don't have any future reservation!"
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
                      title="Are you sure to cancel this reservation?"
                      onConfirm={handleCancel}
                      okText="Yes, cancel it"
                      cancelText="No"
                    >
                      <Button type="primary">Cancel Reservation</Button>
                    </Popconfirm>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Modal
            visible={canceledProperty}
            footer={[
              <Button onClick={() => setCanceledProperty(null)}>OK</Button>,
            ]}
            onCancel={() => setCanceledProperty(null)}
          >
            <Result
              status="success"
              title={`You have successfully cancelled your reservation at ${canceledProperty}.`}
            />
          </Modal>
        </Row>
      </Content>
    </Layout>
  );
}

export default CancelProperty;

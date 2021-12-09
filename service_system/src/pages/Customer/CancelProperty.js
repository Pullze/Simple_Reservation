import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Layout, Row, Col, Table, Button, message } from "antd";
import axios from "axios";

function CancelProperty() {
  const location = useLocation();
  const [reservations, setReservations] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const columns = [
    {
      title: "Reservation Date",
      dataIndex: "", //FIXME
      sorter: null, //FIXME
    },
    {
      title: "Property Name",
      dataIndex: "property_name",
      sorter: (a, b) => a.property_name.localeCompare(b.property_name),
    },
    {
      title: "Owner Email",
      dataIndex: "owner_email",
      sorter: (a, b) => a.owner_email.localeCompare(b.owner_email),
    },
    {
      title: "Address",
      dataIndex: "address",
      sorter: null, // FIXME
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => setSelectedRowKeys(selectedRowKeys),
    getCheckboxProps: (record) => ({ disabled: record.isCancelled }),
  };

  const handleCancel = () => {
    if (selectedRowKeys.length === 0) {
      message.error("Please select a reservation.");
    } else {
      const reservation = reservations[selectedRowKeys[0]];
      const formData = new FormData();
      formData.append(
        "jsonValue",
        new Blob([JSON.stringify(reservation)], { type: "application/json" })
      );
      axios.post("/api/cancel-reservation", formData).then((res) => {
        if (res.data.code === 200) {
          message.success("Reservation cancellation successful!");
          reservation.isCancelled = true;
          setSelectedRowKeys([]);
        } else {
          message.error(res.data.message);
        }
      });
    }
  };

  useEffect(() => {
    axios
      .get("/api/reservations", { params: { email: location.state.email } })
      .then((res) =>
        setReservations(
          res.data.data.map((item, i) => ({
            ...item,
            key: i,
            isCancelled: false,
          }))
        )
      )
      .catch((err) => console.error(err));
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Row justify="center" align="middle" gutter={[0, 8]}>
        <Col span={24} align="middle">
          <h2>Logged in as {location.state.email}</h2>
          <h1>Cancel Property Reservation</h1>
        </Col>
        <Col align="middle">
          <Table
            dataSource={reservations}
            columns={columns}
            rowSelection={{ type: "radio", ...rowSelection }}
            pagination={{ pageSize: "5", hideOnSinglePage: true }}
          ></Table>
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
              <Button type="primary" onClick={handleCancel}>
                Cancel Reservation
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Layout>
  );
}

export default CancelProperty;

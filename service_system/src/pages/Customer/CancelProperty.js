import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Layout, Row, Col, Table, Button, message } from "antd";
import { Content } from "antd/lib/layout/layout";
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
  };

  const handleCancel = () => {
    if (selectedRowKeys.length === 0) {
      message.error("Please select a reservation.");
    } else {
      const reservation = reservations[selectedRowKeys[0]];
      const formData = new FormData(); //FIXME
      formData.append(
        "jsonValue",
        new Blob([JSON.stringify(reservation)], { type: "application/json" })
      );
      axios.post("/api/cancel-reservation", formData).then((res) => {
        if (res.data.code === 200) {
          message.success("Success!");
          setTimeout(() => {
            setReservations(
              reservations.filter(({ key }) => key !== selectedRowKeys[0])
            );
            setSelectedRowKeys([]);
          }, 1000);
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
          <Col xs={22} sm={20} md={16} lg={15} xl={15} xxl={15}>
            <Row justify="center" align="middle" gutter={[24, 24]}>
              <Col span={24} align="middle">
                <h2>Now logged in as {location.state.email}</h2>
                <h1 className="heading">Cancel Property Reservation</h1>
              </Col>
              <Col span={24}>
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
                      Cancel
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

export default CancelProperty;

import React, { useState } from "react";
import { Layout, Row, Col, Button, Input, Modal, Result, DatePicker } from "antd";
import { useHistory, useLocation } from "react-router";
import { Content } from "antd/lib/layout/layout";
import axios from "axios";

export default function ProcessDate(props) {
  const location = useLocation();
  console.log(location.state);

  const state = useState;
  const history = useHistory();

  const [date, setDate] = state("");
  const [visible, setIsVisible] = state(false);
  const [message, setMessage] = state("");
  const [status, setStatus] = state("warning");

  const showModal = () => {
    setIsVisible(true);
  };

  const handleCancel = () => {
    setIsVisible(false);
    setStatus("warning");
  };

  const processDate = () => {
    axios
      .get("/api/process_date", {
        params: {
          currentDate: date,
        },
      })
      .then((res) => {
        console.log(res.data);
        setMessage(res.data.message);
        if (res.data.code === 200) {
          setStatus("success");
        } else {
          setStatus("error");
        }
        showModal();
      })
      .catch((err) => {
        console.log(err);
      });
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
            <Row
              justify="center"
              align="middle"
              gutter={[24, 24]}
              style={{ minHeight: "36vh", padding: "25% 10%" }}
            >
              <Modal
                visible={visible}
                title="Alert"
                footer={[
                  <Button key="back" onClick={() => handleCancel()}>
                    OK
                  </Button>,
                ]}
                onCancel={() => handleCancel()}
              >
                <Result title={message} status={status} />
              </Modal>
              <Col span={24} align="middle">
                <h2>Now logged in as {location.state.email}</h2>
                <h1 className="heading">Process Date</h1>
              </Col>
              <Col span={24} align="middle">
                <p>
                  Set Current System Date:
                  <DatePicker onChange={(date, dateString) => setDate(dateString)} style={{ marginLeft: "8px", minWidth: "300px" }}/>
                </p>
              </Col>
              <Col span={12} align="right">
                <Button onClick={() => history.goBack()}> Back </Button>
              </Col>
              <Col span={12} align="left">
                <Button type="primary" onClick={processDate}>
                  {" "}
                  Set Date{" "}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

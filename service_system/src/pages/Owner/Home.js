import React, { useState } from "react";
import { Layout, Row, Col, Button, Modal, Result } from "antd";
import { useHistory, useLocation } from "react-router";
import { Content } from "antd/lib/layout/layout";
import axios from "axios";

const links = [
  {
    label: "Add Property",
    path: "/owner/add-property",
  },
  {
    label: "Remove Property",
    path: "/owner/remove-property",
  },
  {
    label: "Rate Customer",
    path: "/owner/rate-customer",
  },
];

function Home(props) {
  const history = useHistory();
  const location = useLocation();
  console.log(location.state);

  const state = useState;

  const [visible, setIsVisible] = state(false);
  const [confirmLoading, setConfirmLoading] = state(false);
  const [modalState, setModalState] = state("warning");
  const [modalTitle, setModalTitle] = state("Are your suer you want to DELETE your own Owner account?");

  const showModal = () => {
    setModalState("warning");
    setModalTitle("Are your sure you want to delete your own Owner account?");
    setIsVisible(true);
  };

  const handleCancel = () => {
      if (modalState === "success" || modalState === "error") {
        history.replace("/");
      }
      setIsVisible(false);
  };

  const handleDelete = () => {
    setConfirmLoading(true);
    axios.delete('/api/delete_owner', {
      params: {
        email: location.state.email
      }
    })
    .then((res) => {
      console.log(res.data);
      if (res.data.code === 200) {
        setModalState("success");
      } else if (res.data.code === 403) {
        setModalState("info");
      } else {
        setModalState("error");
      }
      setConfirmLoading(false);
      setModalTitle(res.data.message);
    })
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ margin: '24px 24px 24px', background: "white"}}>
        <Row align="middle" justify="space-around">
          <Col xs={22} sm={20} md={16} lg={15} xl={15} xxl={15}>
            <Row justify="space-around" align="middle" gutter={[24, 24]} style={{ padding: "20% 10%"}}>
              <Modal
                  visible={visible}
                  title="Alert"
                  confirmLoading={confirmLoading}
                  footer={modalState === "warning" && [
                  <Button key="back" type="primary" onClick={() => handleCancel()}>
                      Cancel
                  </Button>,
                  <Button key="back" type="primary" danger onClick={() => handleDelete()} loading={confirmLoading}>
                      DELETE
                  </Button>,
                  ]}
                  onCancel={() => handleCancel()}
              >
                <Result
                  status={modalState}
                  title={modalTitle}
                  extra={modalState !== "warning"&& modalState !== "info" && <Button type="primary" href="/"> Back to Login </Button>}
                />
              </Modal>
              <Col span={24} align="middle">
                <h2>Now logged in as {location.state.email} </h2>
              </Col>
              <Col className="heading" span={24} align="middle">
                Owner Home
              </Col>
              {links.map((link, i) => (
                <Col className="item" key={i}  xxl={12} xl={12} md={12} sm={24} xs={24} align="middle">
                  <Button type="default" href={link.path} style={{ minWidth: "150px", minHeight: "100%" }}> 
                    {link.label}
                  </Button>
                </Col>
              ))}
              <Col span={24} align="middle" style={{ paddingTop: "48px" }}>
                <Button type="default" danger onClick={()=>{history.replace("/")}} style={{ minWidth: "150px", minHeight: "100%" }}> 
                  Logout
                </Button>
              </Col>
              <Col span={24} align="middle">
                <Button type="primary" danger onClick={showModal} style={{ minWidth: "150px", minHeight: "100%" }}> 
                  Delete Account
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default Home;

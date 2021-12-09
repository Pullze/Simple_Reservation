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
    setModalTitle("Are your suer you want to DELETE your own Owner account?");
    setIsVisible(true);
  };

  const handleCancel = () => {
      if (modalState !== "warning") {
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
      } else {
        setModalState("error");
      }
      setConfirmLoading(false);
      setModalTitle(res.data.message);
    })
  }

  return (
    <Layout>
      <Content style={{ margin: '24px 24px 24px', background: "white"}}>
        <Row className="admin-home-row" justify="space-around" align="middle" gutter={[24, 24]}>
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
              extra={modalState !== "warning" && <Button type="primary" href="/"> Back to Login </Button>}
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
          <Col span={24} align="middle">
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
      </Content>
    </Layout>
  );
}

export default Home;
import React, {useEffect, useState} from "react";
import {Layout, Row, Col, Button, Modal, Result, Select, Form, Spin, Table, Popconfirm, message} from "antd";
import { useHistory, useLocation } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

const { Option } = Select;
const { Content } = Layout;

export default function RemoveProperty(props) {

  const location = useLocation();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [properties, setProperties] = useState([]);
  const [modalState, setModalState] = useState("warning");
  const [modalTitle, setModalTitle] = useState("");
  const [visible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const today = moment();
  const dateFormat = "YYYY-MM-DD";

  const showModal = () => {
    setIsVisible(true);
  };

  const handleCancel = () => {
    setIsVisible(false);
    handleReset();
  };

  const getProperties = () => {
    axios.get("/api/properties_to_remove", {
      params: {
        ownerEmail: location.state.email,
        curDate: today.format(dateFormat),
      }
    }).then((res) => {
        const proplist = res.data.data;
        setProperties(
          proplist.map((item, i) => ({
            ...item,
            key: i,
          }))
        );
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  const handleRemove = () => {
    if (selectedRowKeys.length === 0) {
      message.error("Please select a property.");
    } else {
      axios.get("/api/remove_property", {
        params: {
          ownerEmail: location.state.email,
          propertyName: selectedRow[0].property_name,
        }
      }).then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          setModalState("success");
        } else {
          setModalState("error");
        }
        setModalTitle(res.data.message);
        showModal();
      }).catch((err) => {
        console.log(err);
      })
    }
  };

  const handleReset = () => {
    setLoading(true);
    setSelectedRow([]);
    setSelectedRowKeys([]);
    getProperties();
  }

  const columns = [
    {
      title: "Property Name",
      dataIndex: "property_name",
      key: "property_name",
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
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

  useEffect(() => {
    getProperties();
  }, []);

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
                <h1 className="heading">Remove Properties</h1>
              </Col>
              <Col span={24} align="left">
                <h3>Click '+' to read each property's description!</h3>
              </Col>
              <Col span={24} align="middle">
                <Spin spinning={loading}>
                  <Table
                    dataSource={properties}
                    rowSelection={{ type: "radio", ...rowSelection }}
                    columns={columns}
                    pagination={{ pageSize: 6 }}
                    expandable={{
                      expandedRowRender: (record) => (
                        <p style={{margin: 0}}>{record.descr}</p>
                      ),
                    }}
                  />
                </Spin>
              </Col>
              <Col>
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
              </Col>
              <Col>
                <Popconfirm
                  title="Are you sure to remove this property?"
                  onConfirm={handleRemove}
                >
                  <Button type="default" danger>
                    {" "}Remove{" "}
                  </Button>
                </Popconfirm>
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

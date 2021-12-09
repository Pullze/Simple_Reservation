import React, { useState, useEffect, useRef, useContext } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Layout, Row, Col, Table, Form, Input, Button, message } from "antd";
import { Content } from "antd/lib/layout/layout";
import axios from "axios";
import "./EditableTable.css";

// Editable Table helpers

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (err) {
      console.log("Save failed:", err);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item name={dataIndex} style={{ margin: 0 }}>
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        onClick={toggleEdit}
        style={{ paddingRight: 24 }}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

function RateOwner() {
  const location = useLocation();
  const [owners, setOwners] = useState([]);

  const columns = [
    {
      title: "Reservation Date",
      dataIndex: "", //FIXME
    },
    {
      title: "Owner Email",
      dataIndex: "owner_email",
    },
    {
      title: "Property Name",
      dataIndex: "property_name",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Rating",
      dataIndex: "rating", //FIXME
      editable: true,
    },
  ];

  //   useEffect(() => {
  //     axios
  //       .get("/api/owners", { params: { customer: location.state.email } })
  //       .then((res) =>
  //         setOwners(
  //           res.data.data.map((item) => ({ ...item, rating: ""}))
  //         )
  //       );
  //   }, []);

  const handleSubmit = () => {
    const unratedOwners = [...owners];
    owners.forEach((owner) => {
      if (owner.rating.length > 0 && !isNaN(owner.rating)) {
        const formData = new FormData();
        formData.append(
          "jsonValue",
          new Blob([JSON.stringify(formData)], { type: "application/json" })
        );
        axios.post("api/customer-rate-owner", formData).then((res) => {
          if (res.data.code === 200) {
            const index = unratedOwners.indexOf(owner);
            unratedOwners.splice(index, 1);
          } else {
            message.error(res.data.message);
          }
        });
      }
    });
    if (unratedOwners.length === owners.length) {
      return message.error("Please enter an integer value for rating.");
    }
    message.success(
      `Successfully rated ${owners.length - unratedOwners.length} owners!`
    );
    setTimeout(() => {
      setOwners(unratedOwners);
    }, 1000);
  };

  const handleSave = (row) => {
    const newData = [...owners];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setOwners(newData);
  };

  const ownerColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };
  });

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
                <h1 className="heading">Rate Owner</h1>
              </Col>
              <Col align="middle">
                <Table
                  dataSource={owners}
                  columns={ownerColumns}
                  components={{
                    body: { row: EditableRow, cell: EditableCell },
                  }}
                  rowClassName={() => "editable-row"}
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
                    <Button type="primary" onClick={handleSubmit}>
                      Submit
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

export default RateOwner;

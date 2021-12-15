import React, { useState, useEffect, useRef, useContext } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import {
  Layout,
  Row,
  Col,
  Table,
  Form,
  Input,
  DatePicker,
  Button,
  Modal,
  Result,
  Empty,
  message, Spin,
} from "antd";
import { Content } from "antd/lib/layout/layout";
import axios from "axios";
import moment from "moment";
import "./EditableTable.css";

const today = moment();

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

function RateCustomer() {
  const location = useLocation();
  const [customers, setCustomers] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [rating, setRating] = useState({ ownerEmail: null, isRated: false });
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      title: "Reservation Date",
      dataIndex: "startDate", //FIXME
    },
    {
      title: "Customer Email",
      dataIndex: "customerEmail",
    },
    {
      title: "Property Name",
      dataIndex: "propertyName",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Rating",
      dataIndex: "score",
      editable: true,
    },
  ];

  useEffect(() => {
    axios
      .get("/api/customers_to_rate", {
        params: {
          ownerEmail: location.state.email,
          currentDate: today.format("YYYY-MM-DD"),
        },
      })
      .then((res) => {
        setCustomers(
          res.data.data.map((item, i) => ({
            ...item,
            key: i,
            startDate: moment(item.startDate).format("MM/DD/YY"),
            score: "",
          }))
        );
        setLoading(false);
      });
  }, []);

  const handleSubmit = () => {
    if (selectedRowKeys.length === 0) {
      return message.error("Please select a customer.");
    } else {
      const customer = customers.filter(({ key }) => key === selectedRowKeys[0])[0];
      if (
        isNaN(customer.score) ||
        customer.score.length !== 1 ||
        +customer.score < 1 ||
        +customer.score > 5
      ) {
        return message.error("Please enter an integer value between 1 and 5.");
      }

      const { customerEmail, score } = customer;
      axios({
        method: "post",
        url: "/api/owner_rate_customer",
        params: {
          customerEmail,
          ownerEmail: location.state.email,
          score: +score,
        },
      })
        .then((res) => {
          if (res.data.code === 200) {
            setRating({ customerEmail, isRated: true });
            setCustomers(customers.filter(({ key }) => key !== selectedRowKeys[0]));
            setSelectedRowKeys([]);
          } else {
            message.error(res.data.message);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleSave = (row) => {
    const newData = [...customers];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setCustomers(newData);
  };

  const customerColumns = columns.map((col) => {
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
                <h1 className="heading">Rate Customer</h1>
              </Col>
              <Col span={24}>
                <Form.Item label="Current Date">
                  <DatePicker disabled defaultValue={today} />
                </Form.Item>
              </Col>
              <Col span={24} align="middle">
                <Spin spinning={loading}>
                  <Table
                    dataSource={customers}
                    columns={customerColumns}
                    components={{
                      body: { row: EditableRow, cell: EditableCell },
                    }}
                    rowClassName={() => "editable-row"}
                    rowSelection={{ type: "radio", ...rowSelection }}
                    pagination={{ pageSize: "5", hideOnSinglePage: true }}
                    locale={{
                      emptyText: (
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description="No more owners to rate!"
                        />
                      ),
                    }}
                  />
                </Spin>
              </Col>
              <Col span={24}>
                <Row justify="center" gutter={16}>
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
                    <Button type="primary" onClick={handleSubmit}>
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Modal
                visible={rating.isRated}
                footer={[
                  <Button
                    onClick={() => setRating({ ...rating, isRated: false })}
                  >
                    OK
                  </Button>,
                ]}
                onCancel={() => setRating({ ...rating, isRated: false })}
              >
                <Result
                  status="success"
                  title={`You have successfully submitted a rating for ${rating.customerEmail}.`}
                />
              </Modal>
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default RateCustomer;

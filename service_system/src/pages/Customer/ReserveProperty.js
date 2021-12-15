import React, { useEffect, useState, useRef, useContext } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import {
  Layout,
  Row,
  Col,
  Form,
  Input,
  DatePicker,
  Button,
  Table,
  Modal,
  Result,
  Descriptions,
  message,
} from "antd";
import { Content } from "antd/lib/layout/layout";
import moment from "moment";
import axios from "axios";
import "./EditableTable.css";

const { RangePicker } = DatePicker;

const today = moment("2021-10-07");
const dateFormat = "YYYY-MM-DD";

// Columns

const columns = [
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
    title: "Capacity",
    dataIndex: "capacity",
    sorter: (a, b) => a.capacity - b.capacity,
  },
  {
    title: "Number of Guests",
    dataIndex: "num_guests",
    editable: true,
  },
];

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

function ReserveProperty() {
  const location = useLocation();
  const [form] = Form.useForm();
  const [dates, setDates] = useState(null);
  const [properties, setProperties] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [reservation, setReservation] = useState({
    property_name: null,
    num_guests: null,
    total_cost: null,
    is_reserved: false,
  });

  useEffect(() => {
    if (dates) {
      axios
        .get("/api/available_properties", {
          params: {
            start: dates[0].format(dateFormat),
            end: dates[1].format(dateFormat),
          },
        })
        .then((res) =>
          setProperties(
            res.data.map((item, i) => ({ ...item, key: i, num_guests: 0 }))
          )
        )
        .catch((err) => console.error(err));
    } else {
      setSelectedRowKeys([]);
      setProperties([]);
    }
  }, [dates]);

  const handleReserve = () => {
    if (selectedRowKeys.length === 0) {
      message.error("Please select a property.");
    } else {
      const property = properties.filter(
        ({ key }) => key === selectedRowKeys[0]
      )[0];
      const { property_name, owner_email, capacity, cost } = property;

      let num_guests = property.num_guests;

      if (isNaN(num_guests)) {
        return message.error("Please enter an integer value.");
      }

      num_guests = +num_guests;

      if (num_guests <= 0) {
        message.error("Number of guests must be greater than 0.");
      } else if (num_guests > capacity) {
        message.error("Number of guests must not exceed property capacity.");
      } else {
        const reserve = {
          property_name,
          owner_email,
          customer: location.state.email,
          start_date: dates[0].format(dateFormat),
          end_date: dates[1].format(dateFormat),
          num_guests,
        };
        const formData = new FormData();
        formData.append(
          "jsonValue",
          new Blob([JSON.stringify(reserve)], { type: "application/json" })
        );
        axios
          .post("/api/reserve_property", formData)
          .then((res) => {
            if (res.data.code === 200) {
              const reservation = res.data.data;
              reservation.total_cost = reservation.num_guests * cost;
              reservation.is_reserved = true;
              setReservation(reservation);

              property.capacity -= reservation.num_guests;
              property.num_guests = 0;
              setProperties(properties.filter((item) => item.capacity > 0));
              setSelectedRowKeys([]);
            } else {
              message.error(res.data.message);
            }
          })
          .catch((err) => console.error(err));
      }
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => setSelectedRowKeys(selectedRowKeys),
  };

  const handleSave = (row) => {
    const newData = [...properties];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setProperties(newData);
  };

  const propertyColumns = columns.map((col) => {
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
                <h1 className="heading">Reserve Property</h1>
              </Col>

              <Col span={24}>
                <Form form={form} name="reserve-property" scrollToFirstError>
                  <Row justify="center" gutter={8}>
                    <Col span={14} align="left">
                      <Form.Item name="dates" label="Dates">
                        <RangePicker
                          disabledDate={(d) =>
                            !d ||
                            d.format(dateFormat) <= today.format(dateFormat)
                          }
                          onChange={(d) => setDates(d)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={10} align="right">
                      <Form.Item name="current_date" label="Current Date">
                        <DatePicker defaultValue={today} disabled />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Col>

              <Col span={24}>
                <Table
                  components={{
                    body: { row: EditableRow, cell: EditableCell },
                  }}
                  rowClassName={() => "editable-row"}
                  rowSelection={{ type: "radio", ...rowSelection }}
                  dataSource={properties}
                  columns={propertyColumns}
                  pagination={{ pageSize: "5", hideOnSinglePage: true }}
                />
              </Col>

              <Col span={24}>
                <Row justify="center" gutter={16}>
                  <Col align="middle">
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
                  <Col align="middle">
                    <Button type="primary" onClick={handleReserve}>
                      Reserve
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Modal
            visible={reservation.is_reserved}
            footer={[
              <Button
                onClick={() =>
                  setReservation({ ...reservation, is_reserved: false })
                }
              >
                OK
              </Button>,
            ]}
            onCancel={() =>
              setReservation({ ...reservation, is_reserved: false })
            }
          >
            <Result
              status="success"
              title={`You have successfully made a reservation at ${reservation.property_name}.`}
              extra={
                <div style={{ background: "white" }}>
                  <Descriptions size="default" column={1} bordered>
                    <Descriptions.Item label="Booked Property Name">
                      {reservation.property_name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Number of Guests">
                      {reservation.num_guests}
                    </Descriptions.Item>
                    <Descriptions.Item label="Amount Spent">
                      {"$" + reservation.total_cost}
                    </Descriptions.Item>
                  </Descriptions>
                </div>
              }
            />
          </Modal>
        </Row>
      </Content>
    </Layout>
  );
}

export default ReserveProperty;

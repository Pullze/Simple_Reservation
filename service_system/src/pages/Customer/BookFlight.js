import React, { useEffect, useState, useRef, useContext } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import {
  Layout,
  Row,
  Col,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Table,
  Descriptions,
  Modal,
  Result,
  message,
} from "antd";
import { Content } from "antd/lib/layout/layout";
import moment from "moment";
import axios from "axios";
import "./EditableTable.css";

const { Option } = Select;

const today = moment();
const dateFormat = "YYYY-MM-DD";

const columns = [
  {
    title: "Airline",
    dataIndex: "airline_name",
    sorter: (a, b) => a.airline_name.localeCompare(b.airline_name),
  },
  {
    title: "Flight Number",
    dataIndex: "flight_num",
    sorter: (a, b) => +a.flight_num - +b.flight_num,
  },
  {
    title: "From",
    dataIndex: "from_airport",
  },
  {
    title: "To",
    dataIndex: "to_airport",
  },
  {
    title: "Date",
    dataIndex: "flight_date",
  },
  {
    title: "Available Seats",
    dataIndex: "remaining_seats",
  },
  {
    title: "Number of Seats",
    dataIndex: "book_seats",
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

function BookFlight() {
  const location = useLocation();
  const [form] = Form.useForm();
  const [airports, setAirports] = useState([]);
  const [flights, setFlights] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [booking, setBooking] = useState({
    flight_num: null,
    book_seats: null,
    boot_cost: null,
    is_booked: false,
  });
  const [from, setFrom] = useState("all");
  const [to, setTo] = useState("all");
  const [date, setDate] = useState(null);

  useEffect(() => {
    axios.get("/api/view_airport").then((res) =>
      setAirports([
        { value: "all", label: "All" },
        ...res.data.data.map(({ airport_id, airport_name }) => ({
          value: airport_id,
          label: `${airport_name} (${airport_id})`,
        })),
      ])
    );
    axios
      .get("/api/flights", { params: { minSeats: 1 } })
      .then((res) =>
        setFlights(
          res.data.data.map((item, i) => ({
            ...item,
            key: i,
            book_seats: "0",
          }))
        )
      )
      .catch((err) => console.error(err));
  }, []);

  const handleBook = () => {
    if (selectedRowKeys.length === 0) {
      message.error("Please select a flight.");
    } else {
      const flight = flights.filter(({ key }) => key === selectedRowKeys[0])[0];
      if (isNaN(flight.book_seats)) {
        return message.error("Please enter an integer value.");
      }

      const { airline_name, flight_num, flight_date, remaining_seats } = flight;
      const book_seats = +flight.book_seats;

      if (book_seats <= 0) {
        message.error("Number of seats must be greater than 0.");
      } else if (book_seats > remaining_seats) {
        message.error("Number of seats must not exceed flight capacity.");
      } else {
        const bookInfo = {
          airline_name,
          flight_num,
          flight_date,
          customer: location.state.email,
          book_seats,
        };
        const formData = new FormData();
        formData.append(
          "jsonValue",
          new Blob([JSON.stringify(bookInfo)], { type: "application/json" })
        );
        axios
          .post("/api/book_flight", formData)
          .then((res) => {
            if (res.data.code === 200) {
              const booking = res.data.data;
              setBooking({ ...booking, is_booked: true });

              flight.remaining_seats -= booking.book_seats;
              flight.book_seats = 0;
              setFlights(flights.filter((item) => item.remaining_seats > 0));
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
    const newData = [...flights];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setFlights(newData);
  };

  const flightColumns = columns.map((col) => {
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

  const renderAirportSelect = (name, label, dependency) => {
    return (
      <Form.Item
        name={name}
        label={label}
        dependencies={[dependency]}
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (
                !value ||
                value === "all" ||
                value !== getFieldValue(dependency)
              ) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Origin and destination must not be the same.")
              );
            },
          }),
        ]}
      >
        <Select
          showSearch
          defaultValue={"All"}
          onSelect={(value) =>
            name === "from_airport" ? setFrom(value) : setTo(value)
          }
        >
          {airports.map((airport, i) => (
            <Option key={i} value={airport.value}>
              {airport.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
    );
  };

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
                <h1 className="heading">Book Flight</h1>
              </Col>
              <Col span={18} style={{ maxWidth: "500px" }}>
                <Form form={form} name="book-flight" scrollToFirstError>
                  <Row justify="center" gutter={8}>
                    <Col span={24}>
                      {renderAirportSelect(
                        "from_airport",
                        "From",
                        "to_airport"
                      )}
                    </Col>
                    <Col span={24}>
                      {renderAirportSelect("to_airport", "To", "from_airport")}
                    </Col>
                    <Col span={24}>
                      <Form.Item name="flight_date" label="Date">
                        <DatePicker
                          onChange={(value) => setDate(value)}
                          disabledDate={(d) =>
                            !d ||
                            d.format(dateFormat) <= today.format(dateFormat)
                          }
                        />
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
                  dataSource={flights.filter(
                    (flight) =>
                      (from === "all" || flight.from_airport === from) &&
                      (to === "all" || flight.to_airport === to) &&
                      (!date || date.format(dateFormat) === flight.flight_date)
                  )}
                  columns={flightColumns}
                  pagination={{ pageSize: "5", hideOnSinglePage: true }}
                />
              </Col>
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
                <Button type="primary" onClick={handleBook}>
                  Book Flight
                </Button>
              </Col>
              <Modal
                visible={booking.is_booked}
                footer={[
                  <Button
                    onClick={() => setBooking({ ...booking, is_booked: false })}
                  >
                    OK
                  </Button>,
                ]}
                onCancel={() => setBooking({ ...booking, is_booked: false })}
              >
                <Result
                  status="success"
                  title={`You have successfully booked ${booking.book_seats} seat(s) on Flight ${booking.flight_num}.`}
                >
                  <div style={{ background: "white" }}>
                    <Descriptions size="default" column={1} bordered>
                      <Descriptions.Item label="Booked Flight Number">
                        {booking.flight_num}
                      </Descriptions.Item>
                      <Descriptions.Item label="Number of Seats">
                        {booking.book_seats}
                      </Descriptions.Item>
                      <Descriptions.Item label="Amount Spent">
                        {"$" + booking.book_cost}
                      </Descriptions.Item>
                    </Descriptions>
                  </div>
                </Result>
              </Modal>
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default BookFlight;

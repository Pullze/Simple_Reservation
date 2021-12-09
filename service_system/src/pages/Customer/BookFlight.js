import React, { useEffect, useState, useRef, useContext } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Layout, Row, Col, Form, Input, Button, Table, message } from "antd";
import axios from "axios";
import "./EditableTable.css";

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
  //   {
  //     title: "Available Seats",
  //     dataIndex: "capacity",
  //     sorter: (a, b) => a.capacity - b.capacity,
  //   },
  {
    title: "Number of Seats",
    dataIndex: "num_seats",
    editable: true,
  },
];

const bookingColumns = [
  {
    title: "Booked Flight Num",
    dataIndex: "flight_num",
  },
  {
    title: "Number of Seats",
    dataIndex: "num_seats",
  },
  {
    title: "Amount Spent",
    dataIndex: "total_cost",
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
  const [flights, setFlights] = useState([]);
  const [selectedRowKey, setSelectedRowKey] = useState(-1);
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    axios
      .get("/api/available-flights")
      .then((res) =>
        setFlights(
          res.data.map((item, i) => ({ ...item, key: i, num_seats: 0 }))
        )
      )
      .catch((err) => console.error(err));
  }, []);

  const handleBook = () => {
    if (selectedRowKey >= 0) {
      const { airline_name, flight_num, capacity, cost } =
        flights[selectedRowKey];
      const num_seats = +flights[selectedRowKey].num_seats;

      if (num_seats <= 0) {
        message.error("Number of seats must be greater than 0.");
      } else if (num_seats > capacity) {
        message.error(
          "Number of seats must not be greater than flight capacity."
        );
      } else {
        const bookInfo = {
          airline_name,
          flight_num,
          customer: location.state.email,
          num_seats,
        };
        const formData = new FormData();
        formData.append(
          "jsonValue",
          new Blob([JSON.stringify(bookInfo)], { type: "application/json" })
        );
        axios
          .post("/api/book-flight", formData)
          .then((res) => {
            if (res.data.code === 200) {
              setBooking([
                {
                  ...res.data.data,
                  total_cost: res.data.data.num_seats * cost,
                },
              ]);
              flights[selectedRowKey].capacity -= res.data.data.num_seats;
              if (flights[selectedRowKey].capacity === 0) {
                flights.splice(selectedRowKey, 1);
              }
              flights[selectedRowKey].num_seats = 0;
              setFlights([...flights]);
            } else {
              message.error(res.data.message);
            }
          })
          .catch((err) => console.error(err));
      }
    } else {
      message.error("Please select a flight.");
    }
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) =>
      setSelectedRowKey(selectedRowKeys[0]),
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

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Row justify="center" align="middle">
        <Col span={24} align="middle">
          <h2>Now logged in as {location.state.email} </h2>
        </Col>
        <Col span={24} align="middle">
          <h1 className="heading">Book Flight</h1>
        </Col>
      </Row>

      <Row justify="center" style={{ padding: "0 20%" }}>
        <Col span={24}>
          <Table
            components={{ body: { row: EditableRow, cell: EditableCell } }}
            rowClassName={() => "editable-row"}
            rowSelection={{ type: "radio", ...rowSelection }}
            dataSource={flights}
            columns={flightColumns}
            pagination={{ pageSize: "5", hideOnSinglePage: true }}
          />
        </Col>
      </Row>
      {booking && (
        <Row justify="center">
          <Table
            dataSource={booking}
            columns={bookingColumns}
            pagination={false}
          ></Table>
        </Row>
      )}
      <Row justify="center" style={{ padding: "2% 40%" }}>
        <Col span={12} align="middle">
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
        <Col span={12} align="middle">
          <Button type="primary" onClick={handleBook}>
            Reserve
          </Button>
        </Col>
      </Row>
    </Layout>
  );
}

export default BookFlight;

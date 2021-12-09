import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Button, Table, Input, Select } from "antd";
import { useHistory, useLocation } from "react-router";
import { Content } from "antd/lib/layout/layout";
import axios from "axios";
import Highlighter from 'react-highlight-words';

export default function ViewFlights(props) {
    const location = useLocation();
    console.log(location.state);

    const state = useState;

    const [flights, setFlights] = state([]);
    const [seat, setSeat] = state();
    const [filtered, setFiltered] = state([]);

    const highLight = () => ({
        render: text =>
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[seat]}
                autoEscape
                textToHighlight={text ? text.toString() : ''}
            />
    });

    const columns = [
        {
            title: 'ID',
            dataIndex: 'flight_id',
            key: 'flight_id',
            sorter: {
                compare: (a, b) => a.flight_id - b.flight_id,
                multiple: 1
            },
        },
        {
            title: 'Airline',
            dataIndex: 'airline',
            key: 'airline',
        },
        {
            title: 'From',
            dataIndex: 'from',
            key: 'from',
        },
        {
            title: 'To',
            dataIndex: 'to',
            key: 'to',
        },
        {
            title: 'Dept. Time',
            dataIndex: 'departure_time',
            key: 'departure_time',
        },
        {
            title: 'Arr. Time',
            dataIndex: 'arrival_time',
            key: 'arrival_time',
        },
        {
            title: 'Date',
            dataIndex: 'flight_date',
            key: 'flight_date',
        },
        {
            title: 'Available Seats',
            dataIndex: 'num_empty_seats',
            key: 'num_empty_seats',
            sorter: {
                compare: (a, b) => a.num_empty_seats - b.num_empty_seats,
                multiple: 1
            },
            ...highLight()
        },
        {
            title: 'Cost per Seaet',
            dataIndex: 'seat_cost',
            key: 'seat_cost',
            sorter: {
                compare: (a, b) => a.seat_cost - b.seat_cost,
                multiple: 1
            },
        },
        {
            title: 'Total Spent',
            dataIndex: 'total_spent',
            key: 'total_spent',
            sorter: {
                compare: (a, b) => a.total_spent - b.total_spent,
                multiple: 1
            },
        },
    ]

    const inputFilter = (value) => {
        setSeat(value);
        setFiltered(flights
            .filter(flight => ("" + flight.num_empty_seats).startsWith(value))
        );
        console.log(filtered);
    }

    function getFlights()  {
        axios.get('/api/view_flight')
            .then((res) => {
                console.log(res.data);
                setFlights(res.data.data);
                setFiltered(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            }
        );
            
    }
    useEffect(
        () => {
            getFlights();
        }, []
    )

    return(
        <Layout style={{minHeight : "100vh"}}>
            <Content style={{ margin: '24px 24px 24px', background: "white"}}>
                <Row justify="center" align="middle" style={{margin: '24px 24px 24px'}}> 
                    <Col xs={22} sm={20} md={16} lg={15} xl={15} xxl={15}>
                        <Row justify="center" align="middle" gutter={[24, 24]} >
                            <Col span={24} align="middle">
                                <h2>Now logged in as {location.state.email}</h2>
                                <h1>View Flights</h1>
                            </Col>
                            <Col span={24} align="middle">
                                <span>
                                    Avaliable Seats:
                                    <Input style={{maxWidth: "300px", marginLeft: "8px"}} placeholder={"#"} onChange={(e) => inputFilter(e.target.value)}/>
                                </span>
                            </Col>
                            <Col>
                                <Table dataSource={filtered} columns={columns}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );

}
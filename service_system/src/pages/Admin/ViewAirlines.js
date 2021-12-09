import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Button, Table, Input, Select } from "antd";
import { useHistory, useLocation } from "react-router";
import { Content } from "antd/lib/layout/layout";
import axios from "axios";
import Highlighter from 'react-highlight-words';

export default function ViewAirlines(props) {
    const location = useLocation();
    console.log(location.state);

    const state = useState;

    const [airlines, setAirlines] = state([]);
    const [name, setName] = state("");
    const [filtered, setFiltered] = state([]);

    const highLight = () => ({
        render: text =>
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[name]}
                autoEscape
                textToHighlight={text ? text.toString() : ''}
            />
    });

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ...highLight()
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            sorter: {
                compare: (a, b) => a.rating - b.rating,
                multiple: 1
            },
        },
        {
            title: 'Total Flights',
            dataIndex: 'total_flights',
            key: 'total_flights',
            sorter: {
                compare: (a, b) => a.total_flights - b.total_flights,
                multiple: 1
            },
        },
        {
            title: 'Minimum Flight Cost',
            dataIndex: 'minimum_flight_cost',
            key: 'minimum_flight_cost',
            sorter: {
                compare: (a, b) => a.minimum_flight_cost - b.minimum_flight_cost,
                multiple: 1
            },
        },
    ]

    const inputFilter = (value) => {
        setName(value);
        setFiltered(airlines
            .filter(airline => airline.name.toLowerCase().startsWith(value.toLowerCase()))
        );
        console.log(filtered);
    }

    function getAirlines()  {
        axios.get('/api/view_airline')
            .then((res) => {
                console.log(res.data);
                setAirlines(res.data.data);
                setFiltered(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            }
        );
            
    }
    useEffect(
        () => {
            getAirlines();
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
                            <h1>View Airlines</h1>
                        </Col>
                        <Col span={24} align="middle">
                            <span>
                                Name:
                                <Input style={{maxWidth: "300px", marginLeft: "8px"}} placeholder={"Name"} onChange={(e) => inputFilter(e.target.value)}/>
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
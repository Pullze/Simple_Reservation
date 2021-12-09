import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Button, Table, Input, Select } from "antd";
import { useHistory, useLocation } from "react-router";
import { Content } from "antd/lib/layout/layout";
import axios from "axios";
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

export default function ViewAirports(props) {
    const location = useLocation();
    console.log(location.state);

    const state = useState;
    const { Option } = Select;

    const [airports, setAirports] = state([]);
    const [timzones, setTimeZones] = state([]);
    const [id, setId] = state("");
    const [time, setTime] = state("");
    
    const getColumnSearchProps = () => ({
    
        onFilter: (value, record) =>
          record.toString().toLowerCase().includes(value.toLowerCase()),
        render: text =>
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[id]}
                autoEscape
                textToHighlight={text ? text.toString() : ''}
            />
    });
    
    const columns = [
        {
            title: 'ID',
            dataIndex: 'airport_id',
            key: 'airport_id',
            ...getColumnSearchProps(),
        },
        {
            title: 'Airport Name',
            dataIndex: 'airport_name',
            key: 'airport_name',
        },
        {
            title: 'Time Zone',
            dataIndex: 'time_zone',
            key: 'time_zone',
        },
        {
            title: 'Total Arriving Flights',
            dataIndex: 'total_arriving_flights',
            key: 'total_arriving_flights',
            sorter: {
                compare: (a, b) => a.total_arriving_flights - b.total_arriving_flights,
                multiple: 1
            },
        },
        {
            title: 'Total Departing Flights',
            dataIndex: 'total_departing_flights',
            key: 'total_departing_flights',
            sorter: {
                compare: (a, b) => a.total_departing_flights - b.total_departing_flights,
                multiple: 1
            },
        },
        {
            title: 'Avg. Departing Flight Cost',
            dataIndex: 'avg_departing_flight_cost',
            key: 'avg_departing_flight_cost',
            sorter: {
                compare: (a, b) => a.avg_departing_flight_cost - b.avg_departing_flight_cost,
                multiple: 1
            },
        },
    ];

    function getAirports()  {
        axios.get('/api/view_airport')
            .then((res) => {
                console.log(res.data);
                setAirports(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            }
        );
            
    }

    function getTimeZones()  {
        axios.get('/api/airport/time_zone')
            .then((res) => {
                console.log(res.data);
                setTimeZones(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            }
        );
            
    }

    const handleChange = (value) => {
        setTime(value);
        console.log(`selected ${value}`);
    }

    useEffect(
        () => {
            getAirports();
            getTimeZones();
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
                                <h1>View Airports</h1>
                            </Col>
                            <Col span={12} align="middle">
                                <span>
                                    ID:
                                    <Input style={{maxWidth: "300px", marginLeft: "8px"}} placeholder={"ID"} onChange={(e) => {setId(e.target.value)}} />
                                </span>
                            </Col>
                            <Col span={12} align="middle">
                                <span>
                                    Time Zone:
                                    <Select style={{ maxWidth: "300px", marginLeft: "8px", width: "100%" }} onChange={handleChange}>
                                        {   
                                            timzones.map((value) => (
                                                <Option value={value}> {value} </Option>
                                            ))
                                        }
                                    </Select>
                                </span>
                            </Col>
                            <Col>
                                <Table dataSource={airports} columns={columns}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );

}
import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Button, Table, Input } from "antd";
import { useHistory, useLocation } from "react-router";
import { Content } from "antd/lib/layout/layout";
import axios from "axios";

export default function ViewCustomers(props) {
    const location = useLocation();
    console.log(location.state);

    const state = useState;

    const [customers, setCustomers] = state([]);
    const [name, setName] = state("");

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Average Rating',
            dataIndex: 'average_rating',
            key: 'average_rating',
            sorter: {
                compare: (a, b) => a.average_rating - b.average_rating,
                multiple: 1
            },
        },
        {
            title: 'Loaction',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Is Owner',
            dataIndex: 'is_owner',
            key: 'is_owner',
            render: is_owner => (
                <> {is_owner && "Yes"} {!is_owner && "No"}</>
            ),
            sorter: {
                compare: (a, b) => a.is_owner - b.is_owner,
                multiple: 1
            },
        },
        {
            title: 'Total Seats Purchased',
            dataIndex: 'total_seats_purchased',
            key: 'total_seats_purchased',
            sorter: {
                compare: (a, b) => a.total_seats_purchased - b.total_seats_purchased,
                multiple: 1
            },
        },
    ]

    function getCustomers()  {
        axios.get('/api/view_customer')
            .then((res) => {
                console.log(res.data);
                setCustomers(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            }
        );
            
    }

    useEffect(
        () => {
            getCustomers();
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
                            <h1>View Customers</h1>
                        </Col>
                        <Col span={24} align="middle">
                            <p>
                                Name:
                                <Input style={{maxWidth: "300px", marginLeft: "8px"}} placeholder={"Name"} onChange={(e) => setName(e.target.value)}/>
                            </p>
                        </Col>
                        <Col>
                            <Table dataSource={customers} columns={columns}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Content>
    </Layout>
    );

}
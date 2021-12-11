import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Table, Input, Button } from "antd";
import { useLocation, useHistory } from "react-router";
import { Content } from "antd/lib/layout/layout";
import axios from "axios";
import Highlighter from 'react-highlight-words';

export default function ViewOwners(props) {

    const location = useLocation();
    const history = useHistory();
    console.log(location.state);

    const state = useState;

    const [owners, setOwners] = state([]);
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
            title: 'Average Rating',
            dataIndex: 'average_rating',
            key: 'average_rating',
            sorter: {
                compare: (a, b) => a.average_rating - b.average_rating,
                multiple: 1
            },
        },
        {
            title: '#Property Owned',
            dataIndex: 'number_of_properties_owned',
            key: 'number_of_properties_owned',
            sorter: {
                compare: (a, b) => a.number_of_properties_owned - b.number_of_properties_owned,
                multiple: 1
            },
        },
        {
            title: 'Avg. Property Rating',
            dataIndex: 'average_property_rating',
            key: 'average_property_rating',
            sorter: {
                compare: (a, b) => a.average_property_rating - b.average_property_rating,
                multiple: 1
            },
        },
    ]

    const inputFilter = (value) => {
        setName(value);
        setFiltered(owners
            .filter(owner => owner.name.toLowerCase().startsWith(value.toLowerCase()))
        );
        console.log(filtered);
    }


    function getOwners()  {
        axios.get('/api/view_owner')
            .then((res) => {
                console.log(res.data);
                setOwners(res.data.data);
                setFiltered(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            }
        );
            
    }

    useEffect(
        () => {
            getOwners();
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
                                <h1>View Owners</h1>
                            </Col>
                            <Col span={24} align="middle">
                                <p>
                                    Name:
                                    <Input style={{maxWidth: "300px", marginLeft: "8px"}} placeholder={"Name"} onChange={(e) => inputFilter(e.target.value)}/>
                                </p>
                            </Col>
                            <Col>
                                <Table dataSource={filtered} columns={columns} pagination={{ pageSize: 8 }}/>
                            </Col>
                            <Col align="middle" span={24}>
                                <Button onClick={() => history.goBack()}> Back </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );

}
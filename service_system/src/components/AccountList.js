import React, { Component } from 'react';
import '../config/config.js';
import axios from 'axios';
import { Table, Row, Col } from 'antd';

export default class AccountList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts : []
        };
    }

    getAccounts()  {
        axios.get('/api/hello')
            .then((res) => {
                console.log(res.data);
                this.setState({ accounts : res.data});
            });
    }

    componentDidMount() {
        this.getAccounts();
    }

    columns = [
        {
            title: 'First Name',
            dataIndex: 'first_Name',
            key: 'first_Name',
        },
        {
            title: 'Last Name',
            dataIndex: 'last_Name',
            key: 'last_Name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Password',
            dataIndex: 'pass',
            key: 'pass',
        },
    ]

    render() {
        
        return (
            <Row justify="center">
                <Col xs={22} sm={20} md={16} lg={15} xl={15} xxl={15}>
                    <p> Welcome to the Demo! </p>
                    <Table dataSource={this.state.accounts} columns={this.columns}/>
                </Col>
            </Row>
        );
    }
    
}
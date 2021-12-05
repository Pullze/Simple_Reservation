import React, { Component } from 'react';
import '../config/config.js';
import axios from 'axios';

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

    render() {
        
        return (
            <>
            <p> Welcome to the Demo! </p>
            <React.Fragment>
                <ul>
                    {
                        this.state.accounts.map((key, index) => {
                            return <li key={index}>{key.email}   {key.first_Name}   {key.last_Name}  {key.pass}</li>
                        })
                    }
                </ul>
            </React.Fragment>
            </>
        );
    }

}
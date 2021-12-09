import React, { useState } from "react";
import { Layout, Row, Col, Button } from "antd";
import { useHistory, useLocation } from "react-router";
import { Content } from "antd/lib/layout/layout";
import axios from "axios";

const links = [
  {
    label: "Add Property",
    path: "/owner/add-property",
  },
  {
    label: "Remove Property",
    path: "/owner/remove-property",
  },
];

export default function DeleteResult(props) {
    const location = useLocation();
    console.log(location.state);

    const state = useState;

    return (
        <Layout style={{minHeight : "100vh"}}>
            <Content style={{ margin: '24px 24px 24px', background: "white"}}>
                <Row justify="center" align="middle" style={{margin: '24px 24px 24px'}}> 
                    <Col xs={22} sm={20} md={16} lg={15} xl={15} xxl={15}>
                        <Row justify="center" align="middle" gutter={[24, 24]} >
                            <Result
                                status="warning"
                                title="There are some problems with your operation."
                                extra={
                                <Button type="primary" key="console">
                                    Go Console
                                </Button>
                                }
                            />,
                        </Row>
                    </Col>
                </Row>
        </Content>
        </Layout>
    );
}

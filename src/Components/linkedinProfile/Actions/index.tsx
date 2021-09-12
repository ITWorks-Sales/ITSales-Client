import React from 'react';
import { Row, Col, Divider } from 'antd';
import Login from './Login';
import SNCollecting from './SNCollecting';
export default function Actions() {
  return (
    <Row justify="space-around">
      <Divider />
      <Col span={3}>
        <Login />
      </Col>
      <SNCollecting />
    </Row>
  );
}

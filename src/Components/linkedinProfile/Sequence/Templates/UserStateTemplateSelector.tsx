import { Col, Row, Select } from 'antd';
import { Form } from 'antd';
import React from 'react';
import { userSelectOption } from '../../CRM/Users/userSelectOptions';

export default () => {
  return (
    <Row justify="center">
      <Col>New State:</Col>
      <Col span={18}>
        <Form.Item name="state">
          <Select
            placeholder="Select the state the user will get"
            options={userSelectOption}
          />
        </Form.Item>
      </Col>
    </Row>
  );
};

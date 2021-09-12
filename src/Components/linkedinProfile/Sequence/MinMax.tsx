import React from 'react';
import { InputNumber, Input, Form, Row, Col } from 'antd';

const { Item } = Form;

type props = { name: string; label: string };

export default function MinMax({ name, label }: props) {
  return (
    <>
      <Row justify="center">
        <Col>{label}:</Col>
        <Col span={17.1}>
          <Input.Group compact>
            <Item
              name={`min_${name}`}
              rules={[
                {
                  required: true,
                  message: '',
                },
              ]}
            >
              <InputNumber
                style={{ width: 70, textAlign: 'center' }}
                placeholder="Min."
                type="number"
              />
            </Item>
            <Input
              style={{
                width: 30,
                borderLeft: 0,
                borderRight: 0,
                pointerEvents: 'none',
              }}
              placeholder="-"
              disabled
            />
            <Item
              name={`max_${name}`}
              rules={[
                {
                  required: true,
                  message: '',
                },
              ]}
            >
              <InputNumber
                style={{
                  width: 70,
                  textAlign: 'center',
                }}
                placeholder="Max."
                type="number"
              />
            </Item>
          </Input.Group>
        </Col>
      </Row>
    </>
  );
}

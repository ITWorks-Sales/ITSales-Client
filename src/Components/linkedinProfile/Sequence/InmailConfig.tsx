import React from 'react';
import {
  Card,
  Form,
  Input,
  Row,
  Col,
  FormInstance,
  Typography,
  Space,
  Divider,
} from 'antd';
import MinMaxFormItem from './MinMax';
import { useEffect } from 'react';
import { InmailConfigType } from './types';
import UserStateTemplateSelector from './Templates/UserStateTemplateSelector';
const { TextArea } = Input;

const { Text } = Typography;

const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 18 },
};

type props = {
  setForm: React.Dispatch<React.SetStateAction<FormInstance<any> | undefined>>;
  children?: React.ReactElement;
  initialValues?: InmailConfigType;
};

export default function InmailConfig({
  setForm,
  children,
  initialValues,
}: props) {
  const [form] = Form.useForm();

  useEffect(() => {
    setForm(form);
  }, []);

  const variables = ['firstName', 'lastName', 'company'];

  return (
    <Card title="Inmail Configuration">
      Available variables:{' '}
      <Space>
        {variables.map((variable) => (
          <>
            <Text keyboard>{`{${variable}}`}</Text>
          </>
        ))}
      </Space>
      <Divider type="horizontal" />
      <Form name="inmail_config_form" form={form} initialValues={initialValues}>
        {children}
        <Form.Item
          {...formItemLayout}
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: 'Please input Inmail Title',
            },
          ]}
        >
          <Input placeholder="Please input Inmail Title" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Message"
          name="message"
          rules={[
            {
              required: true,
              message: 'Please input Inmail Message',
            },
          ]}
        >
          <TextArea
            rows={8}
            showCount
            placeholder="Please input Inmail Message"
          />
        </Form.Item>

        <Row justify="space-around">
          <Col span={8} key={1}>
            <MinMaxFormItem name="nextProfile" label="Next Profile" />
          </Col>
          <Col span={8} key={2}>
            <MinMaxFormItem name="clickMessage" label="Click Message" />
          </Col>
          <Col span={8} key={3}>
            <MinMaxFormItem name="insertTitle" label="Insert Title" />
          </Col>
          <Col span={8} key={4}>
            <MinMaxFormItem name="insertMessage" label="Insert Message" />
          </Col>
          <Col span={8} key={5}>
            <MinMaxFormItem name="clickSend" label="Click Send" />
          </Col>
          <Col span={8} key={6}>
            <UserStateTemplateSelector />
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

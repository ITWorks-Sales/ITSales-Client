import React from 'react';
import { Form, Input, Button, Modal } from 'antd';
import { createProxy } from '../../../api/proxy';
import { useMutation, useQueryClient } from 'react-query';

const layout = {
  labelCol: { span: 6 },
  // wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 10 },
};

const AddProxyForm = (props: any) => {
  const createMutation = useMutation(createProxy);
  const queryClient = useQueryClient();

  const onFinish = (values: any) => {
    createMutation.mutate(values, {
      onSuccess: () => {
        props.setState(false);
        queryClient.refetchQueries('proxy');
      },
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      title="Add Proxy"
      visible={props.state}
      footer={null}
      onCancel={() => props.setState(false)}
    >
      <Form
        {...layout}
        name="proxy"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <br />
        <Form.Item
          label="IP"
          name="ip"
          rules={[{ required: true, message: 'Please input your ip adress!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Login"
          name="login"
          rules={[{ required: true, message: 'Please input your login!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddProxyForm;

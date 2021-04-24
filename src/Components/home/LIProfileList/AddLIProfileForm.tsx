import React from 'react';
import { Form, Input, Button, Modal } from 'antd';
import { useMutation, useQueryClient } from 'react-query';
import { createLinkedinProfile } from '../../../api/linkedinProfile';

const layout = {
  labelCol: { span: 6 },
  // wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 10 },
};

const AddLIProfile = (props: any) => {
  const createMutation = useMutation(createLinkedinProfile);
  const queryClient = useQueryClient();

  const onFinish = (values: any) => {
    createMutation.mutate(values, {
      onSuccess: () => {
        props.setState(false);
        queryClient.refetchQueries('LIProfile');
      },
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      title="Add Linekdin Profile"
      visible={props.state}
      footer={null}
      onCancel={() => props.setState(false)}
    >
      <Form
        {...layout}
        name="profile"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <br />

        <Form.Item
          label="Email"
          name="email"
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

export default AddLIProfile;

import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import profile from '../api/auth/profile';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router';
import login from '../api/auth/login';
import Text from 'antd/lib/typography/Text';
import { BaseType } from 'antd/lib/typography/Base';

const layout = {
  labelCol: { span: 8 },
  // wrapperCol: { span: 4 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const LoginForm = () => {
  const [error, setError]: [{ type: BaseType; data: any }, any] = useState({
    type: 'danger',
    data: '',
  });
  const history = useHistory();

  useQuery('profile', profile, {
    retry: false,
    onSuccess: () => {
      console.log('loggedin');
      history.push('/home/accounts');
    },
  });

  const onFinish = async ({ email, password }: any) => {
    setError({ type: '', data: 'Loading...' });
    try {
      const {
        data: { access_token },
      }: any = await login(email, password);
      setError({ type: 'success', data: 'You logged in!' });
      localStorage.setItem('token', access_token);
      history.push('/home/accounts');
    } catch (err) {
      if (err.response && err.response.status == 401)
        return setError({
          type: 'danger',
          data: 'You entered wrong password or email!',
        });
      setError({
        type: 'danger',
        data: err.response ? err.response.data : JSON.stringify(err),
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className="center"
      style={{ width: 400 }}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
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
        <Text type={error.type}>{error.data}</Text>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;

import { FormInstance } from 'antd';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import InmailConfig from '../InmailConfig';
import { Row, Button, Form, Input } from 'antd';
import { InmailConfigType } from '../types';
import { typedFieldsToRequest } from '../fieldsMisc';
import { createTemplate, updateTemplate } from '../../../../api/templates';
import { useRecoilValue } from 'recoil';
import linkeidnProfileIdState from '../../atoms/linkeidnProfileIdState';
import { useQueryClient } from 'react-query';
import { findLabelByValue } from '../../CRM/Users/userSelectOptions';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 17 },
};

type props = {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  templateId?: number;
  initialValues?: InmailConfigType;
};

export default function InmailSave({
  setIsVisible,
  initialValues,
  templateId,
}: props) {
  const [form, setForm] = useState<FormInstance<any>>();
  const linkedinProfileId = useRecoilValue(linkeidnProfileIdState);
  const queryClient = useQueryClient();

  useEffect(() => {
    console.log(form);
  }, [form]);

  const onClick = async () => {
    if (!form) return;
    try {
      await form.validateFields();

      const {
        templateName,
        title,
        message,
        state,
        ...numbers
      } = form.getFieldsValue();

      for (let i in numbers) {
        numbers[i] = parseInt(numbers[i]);
      }

      const fields: InmailConfigType = {
        templateName,
        title,
        message,
        state: findLabelByValue(state),
        ...numbers,
      };

      if (initialValues && templateId) {
        await updateTemplate({
          type: 'Inmail',
          fields: typedFieldsToRequest(fields),
          templateId: templateId,
        });
      } else {
        await createTemplate({
          type: 'Inmail',
          fields: typedFieldsToRequest(fields),
          linkedinProfileId: linkedinProfileId,
        });
        form.resetFields();
      }

      queryClient.refetchQueries('templates');

      setIsVisible(false);
    } catch (err) {}
  };
  console.log(initialValues);
  return (
    <>
      <InmailConfig setForm={setForm} initialValues={initialValues}>
        <Form.Item
          {...formItemLayout}
          label="Template Name"
          name="templateName"
          rules={[
            {
              required: true,
              message: 'Please input Template Name',
            },
          ]}
        >
          <Input placeholder="Please input Template Name" />
        </Form.Item>
      </InmailConfig>
      <br />
      <Row justify="center">
        <Button type="primary" htmlType="submit" onClick={onClick}>
          Save Template
        </Button>
      </Row>
    </>
  );
}

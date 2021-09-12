import React from 'react';
import { Table } from 'antd';
import templatesState from '../atoms/templatesState';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Template, Field } from '../../../../api/types';
import moment from 'moment';
import selectedTemplateFields from '../atoms/selectedTemplateFields';

type templateTitleProps = {
  title: string;
  fields: Field[];
};

const TemplateTitle = ({ title, fields }: templateTitleProps) => {
  const setSelectedTemplateFields = useSetRecoilState(selectedTemplateFields);
  return <a onClick={() => setSelectedTemplateFields(fields)}>{title}</a>;
};

const columns = [
  {
    title: 'Title',
    key: 'title',
    render: (template: Template) => {
      const fields = template.fields;
      const title = template.fields.find(
        (field) => field.key === 'templateName'
      )!.value;
      return <TemplateTitle title={title} fields={fields} />;
    },
  },
  {
    title: 'Type',
    key: 'type',
    render: (template: Template) => {
      return template.type;
    },
  },
  {
    title: 'Created',
    key: 'created',
    render: (data: Template) => {
      return moment(data.created_at).fromNow();
    },
  },
];

export default () => {
  const templatesData = useRecoilValue(templatesState);

  return (
    <Table
      dataSource={templatesData}
      columns={columns}
      pagination={false}
      style={{ margin: 25 }}
      bordered={true}
      scroll={{ y: '60vh' }}
    />
  );
};

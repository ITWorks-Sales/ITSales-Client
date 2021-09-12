import React from 'react';
import { Table } from 'antd';
import templatesState from '../atoms/templatesState';
import { useRecoilValue } from 'recoil';
import { Template } from '../../../../api/types';
import moment from 'moment';
import TemplateTitle from './TemplateTitle';

const columns = [
  {
    title: 'Title',
    key: 'title',
    render: (template: Template) => {
      return <TemplateTitle template={template} />;
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

export default function TableTemplates() {
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
}

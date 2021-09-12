import { PageHeader } from 'antd';
import React from 'react';

type props = { name: 'Templates' | 'Flows' };

export default function SequenceHeader({ name }: props) {
  return (
    <PageHeader
      title={'Sequences - ' + name}
      backIcon={false}
      style={{ backgroundColor: '#1F1F1B' }}
    />
  );
}

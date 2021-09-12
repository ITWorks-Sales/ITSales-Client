import React from 'react';
import { Action } from './types';
import { Card } from 'antd';
import Text from 'antd/lib/typography/Text';

type props = { key: number; type: Action; description: string };

export default function Template({ key, type, description }: props) {
  return (
    <Card title={type} bordered={false} style={{ height: 200 }} key={key}>
      <Text>{description}</Text>
    </Card>
  );
}

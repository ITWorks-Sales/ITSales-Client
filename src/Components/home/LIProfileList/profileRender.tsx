import React from 'react';
import { Avatar, Badge, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export default function profileRender(record: any) {
  return (
    <>
      <Badge>
        {record.linkedin_image ? (
          <Avatar shape="square" src={record.linkedin_image} />
        ) : (
          <Avatar shape="square" icon={<UserOutlined />} />
        )}
      </Badge>
      <Typography>{record.name}</Typography>
    </>
  );
}

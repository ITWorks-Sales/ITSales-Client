import { Space, Typography } from 'antd';
import React from 'react';
import TagsSelector from './TagsSelector';
import ProfileTypeFilter from './ProfileTypeFilter';
import RadioDatePicker from './RadioDatePicker';
import UserStateSelector from './UserStateSlector';

export default function Filters() {
  return (
    <div style={{ paddingTop: 50, minWidth: 200 }}>
      <Typography.Title level={2} style={{ textAlign: 'center' }}>
        Filters
      </Typography.Title>
      <br />
      <Space direction="vertical" size={24}>
        <ProfileTypeFilter />
        <RadioDatePicker />
        <TagsSelector />
        <UserStateSelector />
      </Space>
    </div>
  );
}

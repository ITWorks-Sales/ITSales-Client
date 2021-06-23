import { UserSwitchOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { ILIUser } from '../../../../api/types';

type props = { user: ILIUser };

export default function VisitProfileAction({ user }: props) {
  const onClick = () => {
    // visit the profile
  };

  return (
    <Button type="primary" icon={<UserSwitchOutlined />} onClick={onClick}>
      Visit Profile
    </Button>
  );
}

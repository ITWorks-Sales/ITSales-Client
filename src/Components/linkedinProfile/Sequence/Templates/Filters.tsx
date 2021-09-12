import { Switch } from 'antd';
import React from 'react';
import { useRecoilState } from 'recoil';
import currentUserOnlyFilter from '../atoms/currentUserOnlyFilter';

export default function Filters() {
  const [currentUserOnly, setCurrentUsersOnly] = useRecoilState(
    currentUserOnlyFilter
  );

  const onChange = (checked: boolean) => {
    setCurrentUsersOnly(checked);
  };

  return (
    <>
      My Templates Only{' '}
      <Switch defaultChecked={currentUserOnly} onChange={onChange} />
    </>
  );
}

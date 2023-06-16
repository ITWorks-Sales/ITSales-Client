import { Input, Typography } from 'antd';
import React from 'react';
import { ChangeEvent } from 'react-router/node_modules/@types/react';
import { useSetRecoilState } from 'recoil';
import nameSearcFilterState from '../atoms/nameSearchFilterState';

export default function NameSearchFilter() {
  const setNameSearcFilter = useSetRecoilState(nameSearcFilterState);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNameSearcFilter(e.target.value);
  };

  return (
    <>
      <Typography.Title level={5}>Name</Typography.Title>
      <Input
        style={{ width: 200 }}
        placeholder="John Smith"
        onChange={onChange}
      />
    </>
  );
}

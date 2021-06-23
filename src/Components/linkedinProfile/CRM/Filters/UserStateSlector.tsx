import { PlusOutlined } from '@ant-design/icons';
import { Select, Typography } from 'antd';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { ILIUserState } from '../../../../api/types';
import userStateFilterState from '../atoms/userStateFilterState';
import { userSelectOption, findLabelByValue } from '../Users/userSelectOptions';

export default function UserStateSelector() {
  const setUserStateFilterState = useSetRecoilState(userStateFilterState);

  const onChange = (values: ILIUserState[]) => {
    const states = values.map(findLabelByValue) as ILIUserState[];
    setUserStateFilterState(states);
  };

  return (
    <>
      <Typography.Title level={5}>State</Typography.Title>
      <Select
        mode="multiple"
        style={{ width: 200 }}
        placeholder={<PlusOutlined />}
        onChange={onChange}
        options={userSelectOption}
      />
    </>
  );
}

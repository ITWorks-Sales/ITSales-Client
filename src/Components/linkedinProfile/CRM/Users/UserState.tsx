import { Select } from 'antd';
import React from 'react';
import { useQueryClient } from 'react-query';
import { updateLinkedinUser } from '../../../../api/linkedinUser';
import { ILIUserState } from '../../../../api/types';
import { userSelectOption, findLabelByValue } from './userSelectOptions';

export default function UserState({
  state,
  id,
}: {
  state: ILIUserState;
  id: number;
}) {
  const queryClient = useQueryClient();
  async function handleChange(value: ILIUserState) {
    try {
      await updateLinkedinUser({
        state: findLabelByValue(value),
        id,
      });
    } catch (err) {
      console.log(err);
    }
    queryClient.refetchQueries(['linkedinUsers']);
  }

  return (
    <Select
      value={state}
      defaultValue="No Action"
      style={{ width: 160 }}
      onChange={handleChange}
      options={userSelectOption}
    />
  );
}

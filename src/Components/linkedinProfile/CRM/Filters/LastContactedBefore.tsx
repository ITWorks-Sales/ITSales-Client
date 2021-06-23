import { DatePicker } from 'antd';
import { Moment } from 'moment';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import contactDateFilterState from '../atoms/contactDateFilterState';

export default function LastContactedBefore() {
  const setContactDateFilterState = useSetRecoilState(contactDateFilterState);
  const onChange = (data: any) => {
    const date = data as Moment;
    if (!date) return setContactDateFilterState([]);
    setContactDateFilterState([date]);
  };
  return <DatePicker bordered={false} showToday={true} onChange={onChange} />;
}

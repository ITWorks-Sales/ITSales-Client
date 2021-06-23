import { DatePicker } from 'antd';
import { Moment } from 'moment';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import contactDateFilterState from '../atoms/contactDateFilterState';

export default function ContactedBetween() {
  const setContactDateFilterState = useSetRecoilState(contactDateFilterState);

  const onChange = (data: any) => {
    const values = data as Moment[];
    if (!values) return setContactDateFilterState([]);
    return setContactDateFilterState(values);
  };
  return (
    <DatePicker.RangePicker
      bordered={false}
      onChange={onChange}
      style={{ width: 220 }}
    />
  );
}

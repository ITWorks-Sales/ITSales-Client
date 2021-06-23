import { Radio, RadioChangeEvent, Typography } from 'antd';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import contactDateFilterState from '../atoms/contactDateFilterState';
import ContactedBetween from './ContactedBetween';
import LastContactedBefore from './LastContactedBefore';

type buttonValueStateType = 'between' | 'before';

export default function RadioDatePicker() {
  const [selectedButtonValue, setSelectedButtonValue] = useState<
    buttonValueStateType
  >('between');

  const setContactDateFilterState = useSetRecoilState(contactDateFilterState);
  const onChange = (e: RadioChangeEvent) => {
    const newValue = e.target.value;
    if (newValue == 'between') setSelectedButtonValue('between');
    if (newValue == 'before') setSelectedButtonValue('before');
    setContactDateFilterState([]);
  };
  return (
    <>
      <Typography.Title level={5}>Contacted</Typography.Title>
      <Radio.Group onChange={onChange} value={selectedButtonValue}>
        <Radio.Button value="between">Between</Radio.Button>
        <Radio.Button value="before">Before</Radio.Button>
      </Radio.Group>
      <br />
      <br />
      {selectedButtonValue === 'between' ? (
        <ContactedBetween />
      ) : selectedButtonValue === 'before' ? (
        <LastContactedBefore />
      ) : (
        ''
      )}
    </>
  );
}

import { Checkbox, Row } from 'antd';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import premiumProfileFilterState from '../atoms/premiumProfileFilterState';
import openProfileFilterState from '../atoms/openProfileFilterState';

export default function ProfileTypeFilter() {
  const setOpenProfileFilterState = useSetRecoilState(openProfileFilterState);

  const setPremiumProfileFilterState = useSetRecoilState(
    premiumProfileFilterState
  );

  const onChange = (values: Array<string | number | boolean>) => {
    if (values.includes('openProfile')) setOpenProfileFilterState(true);
    else setOpenProfileFilterState(false);

    if (values.includes('premiumProfile')) setPremiumProfileFilterState(true);
    else setPremiumProfileFilterState(false);
  };
  return (
    <Checkbox.Group onChange={onChange}>
      <Row>
        <Checkbox value="openProfile">Open Profile </Checkbox>
      </Row>
      <Row>
        <Checkbox value="premiumProfile">Premium Profile</Checkbox>
      </Row>
    </Checkbox.Group>
  );
}

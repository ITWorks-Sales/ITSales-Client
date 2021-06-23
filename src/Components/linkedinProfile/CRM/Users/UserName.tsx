import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import userInfoDrawerIdState from '../atoms/userInfoDrawerIdState';
import userInfoDrawerOpenState from '../atoms/userInfoDrawerOpenState';

type props = {
  id: number;
  name: string;
};

export default function UserName({ id, name }: props) {
  const [userInfoDrawerOpen, setUserInfoDrawerOpen] = useRecoilState(
    userInfoDrawerOpenState
  );
  const setUserInfoDrawerId = useSetRecoilState(userInfoDrawerIdState);

  const onClick = () => {
    setUserInfoDrawerId(id);
    setUserInfoDrawerOpen(!userInfoDrawerOpen);
  };

  return <a onClick={onClick}>{name}</a>;
}

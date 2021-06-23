import React from 'react';
import { Drawer as AntDrawer } from 'antd';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import userInfoDrawerOpenState from '../atoms/userInfoDrawerOpenState';
import userInfoDrawerIdState from '../atoms/userInfoDrawerIdState';
import { useQuery } from 'react-query';
import { ILIUser } from '../../../../api/types';
import { getLinkedinUser } from '../../../../api/linkedinUser';
import UserProfile from './UserProfile';
import userInfoDrawerState from '../atoms/userInfoDrawerState';

export default function Drawer() {
  const [userInfoDrawerOpen, setUserInfoDrawerOpen] = useRecoilState(
    userInfoDrawerOpenState
  );
  const setUserInfoDrawerState = useSetRecoilState(userInfoDrawerState);
  const userInfoDrawerId = useRecoilValue(userInfoDrawerIdState);

  const onClose = () => setUserInfoDrawerOpen(false);

  const { data: requestData, isLoading } = useQuery(
    ['drawerSelectedLinkedinUser', userInfoDrawerId],
    () => getLinkedinUser(userInfoDrawerId)
  );

  let linkedinUser = {} as ILIUser;

  if (requestData) {
    linkedinUser = requestData.data;
    setUserInfoDrawerState(linkedinUser);
  }

  const content = isLoading ? 'Loading' : <UserProfile />;

  return (
    <AntDrawer
      placement="right"
      closable={false}
      onClose={onClose}
      visible={userInfoDrawerOpen}
      width="65vw"
    >
      {content}
    </AntDrawer>
  );
}

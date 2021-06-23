import { atom } from 'recoil';

const userInfoDrawerIdState = atom<number>({
  key: 'userInfoDrawerIdState',
  default: 0,
});

export default userInfoDrawerIdState;

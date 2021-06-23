import { atom } from 'recoil';

const userInfoDrawerOpenState = atom<boolean>({
  key: 'userInfoDrawerOpenState',
  default: false,
});

export default userInfoDrawerOpenState;

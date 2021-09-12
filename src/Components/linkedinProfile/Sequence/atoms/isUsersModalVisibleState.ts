import { atom } from 'recoil';

const isUsersModalVisibleState = atom({
  key: 'isUsersModalVisibleState',
  default: false,
});

export default isUsersModalVisibleState;

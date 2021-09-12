import { atom } from 'recoil';

const currentUserOnlyFilter = atom({
  key: 'currentUserOnlyFilter',
  default: false,
});

export default currentUserOnlyFilter;

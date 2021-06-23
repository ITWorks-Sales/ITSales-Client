import { atom } from 'recoil';

const openProfileFilterState = atom({
  key: 'openProfileFilterState',
  default: false,
});

export default openProfileFilterState;

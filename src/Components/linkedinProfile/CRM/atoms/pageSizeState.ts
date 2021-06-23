import { atom } from 'recoil';

const pageSizeState = atom({
  key: 'pageSizeState',
  default: 10,
});

export default pageSizeState;

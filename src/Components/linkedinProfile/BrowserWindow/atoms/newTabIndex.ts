import { atom } from 'recoil';

const newTabIndexState = atom({
  key: 'newTabIndexState',
  default: 1,
});

export default newTabIndexState;

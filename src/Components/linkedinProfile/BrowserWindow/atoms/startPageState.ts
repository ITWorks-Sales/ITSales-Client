import { atom } from 'recoil';

const startPageState = atom({
  key: 'startPageState',
  default: 'https://google.com',
});

export default startPageState;

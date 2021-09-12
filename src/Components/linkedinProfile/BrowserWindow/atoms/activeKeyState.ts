import { atom } from 'recoil';
import { targetKeyType } from '../types';

const activeKeyState = atom<targetKeyType>({
  key: 'activeKeyState',
  default: '1',
});

export default activeKeyState;

import { atom } from 'recoil';
import { Pane } from '../types';

const panesState = atom<Pane[]>({
  key: 'panesState',
  default: [],
});

export default panesState;

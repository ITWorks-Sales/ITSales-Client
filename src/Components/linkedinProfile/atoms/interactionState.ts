import { atom } from 'recoil';

const interactionState = atom<string>({
  key: 'interactionState',
  default: 'idle',
});

export default interactionState;

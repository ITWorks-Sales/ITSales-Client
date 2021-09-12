import { atom } from 'recoil';

const interactionAction = atom<string>({
  key: 'interactionAction',
  default: 'idle',
});

export default interactionAction;

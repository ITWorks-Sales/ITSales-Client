import { WebviewTag } from 'electron';
import { atom } from 'recoil';

const linkedinWebviewState = atom<WebviewTag>({
  key: 'linkedinWebviewState',
  default: undefined,
});

export default linkedinWebviewState;

import { atom } from 'recoil';
import { Template } from '../../../../api/types';

const templatesState = atom<Template[]>({
  key: 'templatesState',
  default: [],
});

export default templatesState;

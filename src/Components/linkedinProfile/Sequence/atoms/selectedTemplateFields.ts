import { atom } from 'recoil';
import { Field } from '../../../../api/types';

const selectedTemplateFields = atom<Field[]>({
  key: 'selectedTemplateFields',
  default: [],
});

export default selectedTemplateFields;

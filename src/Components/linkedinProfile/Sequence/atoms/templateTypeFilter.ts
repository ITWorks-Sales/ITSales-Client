import { atom } from 'recoil';
import { templateType } from '../../../../api/types';

const templateTypeFilter = atom<templateType | undefined>({
  key: 'templateTypeFilter',
  default: undefined,
});

export default templateTypeFilter;

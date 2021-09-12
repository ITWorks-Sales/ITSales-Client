import { atom } from 'recoil';

const pageSizeTemplates = atom({
  key: 'pageSizeTemplates',
  default: 10,
});

export default pageSizeTemplates;

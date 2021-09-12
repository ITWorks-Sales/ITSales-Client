import { atom } from 'recoil';

const currentPageTemplates = atom({
  key: 'currentPageTemplates',
  default: 1,
});

export default currentPageTemplates;

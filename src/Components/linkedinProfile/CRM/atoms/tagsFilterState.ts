import { atom } from 'recoil';

const tagsFilterState = atom<number[]>({
  key: 'tagsFilterState',
  default: [],
});

export default tagsFilterState;

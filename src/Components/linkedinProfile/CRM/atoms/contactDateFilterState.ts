import { Moment } from 'moment';
import { atom } from 'recoil';

const contactDateFilterState = atom<Moment[]>({
  key: 'contactDateFilterState',
  default: [],
});

export default contactDateFilterState;

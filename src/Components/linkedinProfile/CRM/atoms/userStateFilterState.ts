import { atom } from 'recoil';
import { ILIUserState } from '../../../../api/types';

const userStateFilterState = atom<ILIUserState[]>({
  key: 'userStateFilterState',
  default: [],
});

export default userStateFilterState;

import { atom } from 'recoil';
import { ILIUser } from '../../../../api/types';

const userState = atom<ILIUser[]>({
  key: 'userState',
  default: [],
});

export default userState;

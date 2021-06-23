import { atom } from 'recoil';
import { ILIUser } from '../../../../api/types';

const userInfoDrawerState = atom<ILIUser>({
  key: 'userInfoDrawerState',
  default: <ILIUser>{},
});

export default userInfoDrawerState;

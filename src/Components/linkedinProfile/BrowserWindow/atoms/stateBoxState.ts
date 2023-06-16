import { atom } from 'recoil';
import { stateBoxDefaultValue } from '../../../../constants';
import { stateBox } from '../types';

const stateBoxState = atom<stateBox>({
  key: 'stateBoxState',
  default: stateBoxDefaultValue,
});

export default stateBoxState;

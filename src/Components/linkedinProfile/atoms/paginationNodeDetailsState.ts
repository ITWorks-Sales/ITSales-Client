import { atom } from 'recoil';
import { nodeDetails } from '../../../api/types';

const paginationNodeDetailsState = atom<nodeDetails | undefined>({
  key: 'paginationNodeDetailsState',
  default: undefined,
});

export default paginationNodeDetailsState;

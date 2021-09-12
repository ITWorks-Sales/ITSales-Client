import { atom } from 'recoil';

const selectedFlowId = atom({
  key: 'selectedFlowId',
  default: 0,
});

export default selectedFlowId;

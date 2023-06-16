import { atom } from 'recoil';

const campaignRunningState = atom({
  key: 'campaignRunningState',
  default: false,
});

export default campaignRunningState;

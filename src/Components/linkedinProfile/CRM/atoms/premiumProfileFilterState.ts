import { atom } from 'recoil';

const premiumProfileFilterState = atom({
  key: 'premiumProfileFilterState',
  default: false,
});

export default premiumProfileFilterState;

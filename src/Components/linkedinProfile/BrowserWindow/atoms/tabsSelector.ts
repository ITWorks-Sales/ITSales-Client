import { selector } from 'recoil';
import newTabIndexState from './newTabIndex';
import panesState from './panesState';

const tabsSelector = selector({
  key: 'tabsSelector',
  get: ({ get }) => {
    const newTabIndex = get(newTabIndexState);
    const panes = get(panesState);
    return {
      newTabIndex,
      panes,
    };
  },
});

export { tabsSelector };

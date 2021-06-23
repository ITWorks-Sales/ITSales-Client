import { selector } from 'recoil';
import contactDateFilterState from './contactDateFilterState';
import premiumProfileFilterState from './premiumProfileFilterState';
import tagsFilterState from './tagsFilterState';
import userStateFilterState from './userStateFilterState';
import openProfileFilterState from './openProfileFilterState';
import moment from 'moment';

const CRMfiltersState = selector({
  key: 'CRMFiltersState',
  get: ({ get }) => {
    const contactDateFilter = get(contactDateFilterState).map((time) =>
      moment.utc(time).format('YYYY-MM-DD HH:mm:ss')
    );
    const premiumProfileFilter = get(premiumProfileFilterState);
    const openProfileFilter = get(openProfileFilterState);
    const userStateFilter = get(userStateFilterState);
    const tagsFilter = get(tagsFilterState);

    return {
      contactDateFilter,
      premiumProfileFilter,
      openProfileFilter,
      userStateFilter,
      tagsFilter,
    };
  },
});

export default CRMfiltersState;

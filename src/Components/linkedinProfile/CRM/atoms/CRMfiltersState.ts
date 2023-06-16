import { selector } from 'recoil';
import contactDateFilterState from './contactDateFilterState';
import premiumProfileFilterState from './premiumProfileFilterState';
import tagsFilterState from './tagsFilterState';
import userStateFilterState from './userStateFilterState';
import openProfileFilterState from './openProfileFilterState';
import moment from 'moment';
import nameSearcFilterState from './nameSearchFilterState';

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
    const nameSearchFilter = get(nameSearcFilterState);

    return {
      contactDateFilter,
      premiumProfileFilter,
      openProfileFilter,
      userStateFilter,
      tagsFilter,
      nameSearchFilter,
    };
  },
});

export default CRMfiltersState;

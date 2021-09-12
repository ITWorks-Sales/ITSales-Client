import { selector } from 'recoil';
import currentUserOnlyFilter from './currentUserOnlyFilter';
import templateTypeFilter from './templateTypeFilter';

const templatesFilters = selector({
  key: 'templatesFilters',
  get: ({ get }) => {
    const currentUserOnly = get(currentUserOnlyFilter);
    const templateType = get(templateTypeFilter);
    return {
      currentUserOnly,
      templateType,
    };
  },
});

export default templatesFilters;

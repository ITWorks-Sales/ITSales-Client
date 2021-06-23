import { ILIUserState } from '../../../../api/types';

const userSelectOption = [
  { value: 'no_action', label: 'No Action' },
  { value: 'init_msg', label: 'Initial Message' },
  { value: 'fup', label: 'Follow UP' },
  { value: 'meet_schd', label: 'Meeting Scheduled' },
  { value: 'srch_start_hr', label: 'Search Started by HR' },
  { value: 'prov_cand', label: 'Providing Candidates' },
  { value: 'deal_finish', label: 'Deal Finished' },
];

const findLabelByValue = (value: ILIUserState) => {
  return userSelectOption.find((option) => option.value === value)!
    .label as ILIUserState;
};
export { userSelectOption, findLabelByValue };

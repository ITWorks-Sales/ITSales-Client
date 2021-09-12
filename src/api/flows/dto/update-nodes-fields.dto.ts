import { nodeType, minMax, ILIUserState } from '../../types';

export type updateNodesFieldsDTO = {
  id: number;
  type: nodeType;
  inmailFields?: inmailFields;
};

export type inmailFields = {
  title: string;
  message: string;
  state: ILIUserState;
  next_profile: minMax;
  click_message: minMax;
  insert_message: minMax;
  insert_title: minMax;
  click_send: minMax;
};

import { updateTagLIUserType } from '../../types';

export type UpdateTagLIUserDTO = {
  actionType: updateTagLIUserType;
  tagId: number;
  LIUserId: number;
};

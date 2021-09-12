import { field, templateType } from '../../types';

export type CreateTemplateDTO = {
  type: templateType;
  linkedinProfileId: number;
  fields: field[];
};

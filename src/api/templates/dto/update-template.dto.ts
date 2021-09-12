import { field, templateType } from '../../types';

export type UpdateTemplateDTO = {
  type: templateType;
  templateId: number;
  fields: field[];
};

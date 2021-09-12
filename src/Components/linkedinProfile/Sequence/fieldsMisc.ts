import { Field, field, fieldType } from '../../../api/types';

const requestFieldsToFormFields = (field: Field) => {
  const value =
    field.type === 'string'
      ? field.value
      : field.type === 'number'
      ? parseInt(field.value)
      : /(true|1)/i.test(field.value);
  return { name: field.key, value };
};

const objectToMinMaxFields = (obj: { [key: string]: any }) => {
  const parsed: { [key: string]: { min: any; max: any } } = {};
  for (const [unparsedKey, value] of Object.entries(obj)) {
    const split = unparsedKey.split('_');
    if (split.length <= 0) return;
    if (split[0] !== 'min' && split[0] !== 'max') return;
    let type: 'min' | 'max' = split[0];
    let key = split[1];
    parsed[key][type] = value;
  }
  return parsed;
};

const requestFieldsToTyped = (fields: Field[]) => {
  let typedObject: any = {};

  for (let field of fields) {
    let value: string | number | boolean = field.value;

    if (field.type === 'number') value = Number(value);
    if (field.type === 'bool')
      if (value === 'true') value = true;
      else value = false;

    if (field) typedObject[field.key] = field.value;
  }
  return typedObject;
};

const typedFieldsToRequest = (typedObject: any) => {
  let fields: field[] = [];

  for (let key in typedObject) {
    const value = typedObject[key];
    let type: fieldType = 'string';

    const valueType = typeof value;
    if (valueType === 'number') type = 'number';
    if (valueType === 'boolean') type = 'bool';

    fields.push({
      key: key,
      value: String(value),
      type,
    });
  }
  return fields;
};

export {
  requestFieldsToTyped,
  typedFieldsToRequest,
  requestFieldsToFormFields,
  objectToMinMaxFields,
};

import React from 'react';
import { Divider, Popconfirm, Typography } from 'antd';
import isEditing from '../../Tables/isEditing';
import StartProfileButton from './StartProfileButton';

export default function editRender(
  record: any,
  editingKey: number,
  { save, cancel, edit }: any
) {
  const editable = isEditing(record, editingKey);
  return (
    <>
      {editable ? (
        <span>
          <a onClick={() => save(record.key)} style={{ marginRight: 8 }}>
            Save
          </a>
          <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
            <a>Cancel</a>
          </Popconfirm>
        </span>
      ) : (
        <Typography.Link
          disabled={editingKey !== 0}
          onClick={() => edit(record)}
        >
          Edit
        </Typography.Link>
      )}
      <Divider type="vertical" />
      <StartProfileButton LIProfile={record} />
    </>
  );
}

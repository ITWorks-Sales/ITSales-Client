import { Tag } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import { getTags } from '../../../../api/tags';
import { ITag } from '../../../../api/types';

export default function customTagRender({ value, onClose, closable }: any) {
  const { data: requestData } = useQuery('tags', () => getTags('all'));
  let tags: ITag[] = [];
  if (requestData) {
    tags = requestData.data as ITag[];
  }

  const onPreventMouseDown = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const id = parseInt(value);
  const tag = tags.find((tag) => tag.id === id) as ITag;

  return (
    <Tag
      color={tag.color}
      closable={closable}
      onClose={onClose}
      onMouseDown={onPreventMouseDown}
    >
      {tag.content}
    </Tag>
  );
}

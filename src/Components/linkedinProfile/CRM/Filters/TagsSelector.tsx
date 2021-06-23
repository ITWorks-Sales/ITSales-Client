import { PlusOutlined } from '@ant-design/icons';
import { Select, Tag, Typography } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { getTags } from '../../../../api/tags';
import { ITag } from '../../../../api/types';
import tagsFilterState from '../atoms/tagsFilterState';
import customTagRender from '../Tags/customTagRender';
import selectedTagsFilter from '../Tags/selectedTagsFilter';

export default function TagsSelector() {
  const setTagsFilterState = useSetRecoilState(tagsFilterState);
  const { data: requestData } = useQuery('tags', () => getTags('all'));

  let tags: ITag[] = [];
  if (requestData) {
    tags = requestData.data as ITag[];
  }

  const onChange = (values: string[]) => {
    const ids = values.map((value) => parseInt(value));
    setTagsFilterState(ids);
  };

  return (
    <>
      <Typography.Title level={5}>Tags</Typography.Title>
      <Select
        mode="multiple"
        style={{ width: 200 }}
        placeholder={<PlusOutlined />}
        onChange={onChange}
        tagRender={customTagRender}
        filterOption={selectedTagsFilter}
      >
        {tags.map(({ content, color, id }) => (
          <Tag color={color} key={id}>
            {content}
          </Tag>
        ))}
      </Select>
    </>
  );
}

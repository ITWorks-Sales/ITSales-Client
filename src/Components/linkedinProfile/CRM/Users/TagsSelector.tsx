import { PlusOutlined } from '@ant-design/icons';
import { Select, Tag } from 'antd';
import React from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { updateTagLinkedinUser } from '../../../../api/linkedinUser';
import { getTags } from '../../../../api/tags';
import { ITag, updateTagLIUserType } from '../../../../api/types';
import customTagRender from '../Tags/customTagRender';
import selectedTagsFilter from '../Tags/selectedTagsFilter';

type props = {
  serverTags: ITag[];
  userId: number;
};

export default function TagsSelector({ serverTags, userId }: props) {
  const queryClient = useQueryClient();
  const { data: requestData } = useQuery('tags', () => getTags('all'));
  let tags: ITag[] = [];
  if (requestData) {
    tags = requestData.data as ITag[];
  }

  const defaultValues = serverTags.map(({ id }) => id.toString());

  const handleChange = async (selectedIds: string[]) => {
    let tagId: number = -1;
    let actionType: updateTagLIUserType = 'add';

    // Tag was added
    if (selectedIds.length > serverTags.length) {
      tagId = parseInt(
        selectedIds.filter(
          (id) => !serverTags.find((tag) => tag.id === parseInt(id))
        )[0]
      );
    }

    // Tag was removed
    if (selectedIds.length < serverTags.length) {
      tagId = serverTags.filter(
        (tag) => !selectedIds.find((id) => tag.id === parseInt(id))
      )[0].id;
      actionType = 'remove';
    }

    await updateTagLinkedinUser({
      tagId,
      LIUserId: userId,
      actionType,
    });
    queryClient.refetchQueries('linkedinUsers');
  };

  return (
    <Select
      mode="multiple"
      onChange={handleChange}
      style={{ width: '100%' }}
      bordered={false}
      placeholder={<PlusOutlined />}
      tagRender={customTagRender}
      defaultValue={defaultValues}
      filterOption={selectedTagsFilter}
    >
      {tags.map(({ content, color, id }) => (
        <Tag color={color} key={id}>
          {content}
        </Tag>
      ))}
    </Select>
  );
}

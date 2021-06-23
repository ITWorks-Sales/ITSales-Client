import { PlusOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getTags } from '../../../../api/tags';
import { ITag } from '../../../../api/types';
import ModalAdd from './ModalAdd';
import ModalUpdate from './ModalUpdate';
export default function TagManagement() {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [selectedTag, setSelectedTag] = useState<ITag>();

  const { data: requestData } = useQuery('tags', () => getTags('all'));
  let tags: ITag[] = [];
  if (requestData) {
    tags = requestData.data as ITag[];
  }
  return (
    <>
      {tags.map((tag) => {
        const { color, content, id } = tag;
        return (
          <Tag
            color={color}
            onClick={() => {
              setSelectedTag(tag);
              setIsUpdateModalVisible(true);
            }}
            key={id}
          >
            {content}
          </Tag>
        );
      })}
      <Tag
        className="site-tag-plus"
        onClick={() => setIsCreateModalVisible(!isCreateModalVisible)}
      >
        <PlusOutlined /> New Tag
      </Tag>
      {isUpdateModalVisible ? (
        <ModalUpdate
          setIsModalVisible={setIsUpdateModalVisible}
          tag={selectedTag as ITag}
        />
      ) : (
        ''
      )}

      <ModalAdd
        isModalVisible={isCreateModalVisible}
        setIsModalVisible={setIsCreateModalVisible}
      />
    </>
  );
}

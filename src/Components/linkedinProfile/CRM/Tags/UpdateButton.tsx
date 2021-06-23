import { EditOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import React from 'react';
import { useQueryClient } from 'react-query';
import { updateTag } from '../../../../api/tags';
import { ITag } from '../../../../api/types';

type setState = React.Dispatch<React.SetStateAction<boolean>>;

type props = {
  setIsModalVisible: setState;
  tag: ITag;
  newColor: string;
  newContent: string;
};

export default function UpdateButton({
  setIsModalVisible,
  tag,
  newColor,
  newContent,
}: props) {
  const queryClient = useQueryClient();

  const onClick = async () => {
    if (newColor.length < 1 || newContent.length < 1)
      return message.error("Fields can't be empty.");

    if (!/^#[0-9A-F]{6}$/i.test(newColor))
      return message.error(
        'Color must be a valid HEX Color consisting of 6 characters'
      );
    try {
      await updateTag({ id: tag.id, color: newColor, content: newContent });
      setIsModalVisible(false);
      queryClient.refetchQueries('tags');
    } catch (err) {
      message.error('Error happened, check console.');
      console.error(err);
    }
  };

  return (
    <Button icon={<EditOutlined />} onClick={onClick}>
      Update
    </Button>
  );
}

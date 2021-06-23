import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm } from 'antd';
import React from 'react';
import { useQueryClient } from 'react-query';
import { deleteTag } from '../../../../api/tags';
import { ITag } from '../../../../api/types';

type setState = React.Dispatch<React.SetStateAction<boolean>>;

type props = { setIsModalVisible: setState; tag: ITag };

export default function DeleteButton({ setIsModalVisible, tag }: props) {
  const queryClient = useQueryClient();

  const onConfirm = async () => {
    try {
      await deleteTag({ id: tag.id });
      setIsModalVisible(false);
      queryClient.refetchQueries('tags');
    } catch (err) {
      message.error('Error happened, check console.');
      console.error(err);
    }
  };

  return (
    <Popconfirm
      title="Are you sure?"
      icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
      onConfirm={onConfirm}
    >
      <Button icon={<DeleteOutlined />} danger>
        Delete
      </Button>
    </Popconfirm>
  );
}

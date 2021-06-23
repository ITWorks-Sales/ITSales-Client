import { BgColorsOutlined, EditOutlined } from '@ant-design/icons';
import { Col, Input, Row } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import Text from 'antd/lib/typography/Text';
import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useQueryClient } from 'react-query';
import { createTag } from '../../../../api/tags';

type setState = React.Dispatch<React.SetStateAction<boolean>>;

type props = {
  isModalVisible: boolean;
  setIsModalVisible: setState;
};

export default function ModalAdd({ isModalVisible, setIsModalVisible }: props) {
  const [color, setColor] = useState('#aabbcc');
  const [content, setContent] = useState('tag1');
  const [error, setError] = useState('');
  const [isOkButtonActive, setIsOkButtonActive] = useState(true);
  const queryClient = useQueryClient();

  const onCreate = async () => {
    if (color.length < 1 || content.length < 1)
      return setError("Fields can't be empty.");

    if (!/^#[0-9A-F]{6}$/i.test(color))
      return setError(
        'Color must be a valid HEX Color consisting of 6 characters'
      );

    setError('');
    try {
      setIsOkButtonActive(false);
      await createTag({ content, color });
      setIsOkButtonActive(true);
      setIsModalVisible(false);
      setColor('#aabbcc');
      setContent('tag1');
      queryClient.refetchQueries('tags');
      return;
    } catch (err) {
      setIsOkButtonActive(true);
      const {
        response,
        response: { status },
      } = err;
      setError(`Error: ${status}, more info in the console`);
      console.error(response);
    }
  };

  return (
    <Modal
      visible={isModalVisible}
      onCancel={() => {
        setIsModalVisible(false);
      }}
      style={{ minWidth: 560 }}
      okText="Create"
      onOk={onCreate}
      okButtonProps={{ disabled: !isOkButtonActive }}
    >
      <Row>
        <Col style={{ width: '40%' }}>
          <Text>Content:</Text>
          <Input
            style={{ marginTop: 5 }}
            value={content}
            prefix={<EditOutlined />}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <br />
          <br />
          <Text>Color:</Text>
          <Input
            style={{ marginTop: 5 }}
            value={color}
            prefix={<BgColorsOutlined />}
            onChange={(e) => {
              setColor(e.target.value);
            }}
          />
          <br />
          <br />
          <Text type="danger">{error}</Text>
        </Col>
        <Col offset={2}>
          <HexColorPicker color={color} onChange={setColor} />
        </Col>
      </Row>
    </Modal>
  );
}

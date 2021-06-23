import { BgColorsOutlined, EditOutlined } from '@ant-design/icons';
import { Col, Input, Row } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import Text from 'antd/lib/typography/Text';
import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { ITag } from '../../../../api/types';
import DeleteButton from './DeleteButton';
import UpdateButton from './UpdateButton';

type setState = React.Dispatch<React.SetStateAction<boolean>>;

type props = {
  setIsModalVisible: setState;
  tag: ITag;
};

export default function ModalUpdate({ setIsModalVisible, tag }: props) {
  const [color, setColor] = useState(tag.color);
  const [content, setContent] = useState(tag.content);

  return (
    <Modal
      visible={true}
      onCancel={() => {
        setIsModalVisible(false);
      }}
      style={{ minWidth: 560 }}
      footer={false}
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
          <Row>
            <Col span={11}>
              <UpdateButton
                setIsModalVisible={setIsModalVisible}
                tag={tag}
                newColor={color}
                newContent={content}
              />
            </Col>
            <Col offset={2} span={11}>
              <DeleteButton setIsModalVisible={setIsModalVisible} tag={tag} />
            </Col>
          </Row>
        </Col>
        <Col offset={2}>
          <HexColorPicker color={color} onChange={setColor} />
        </Col>
      </Row>
    </Modal>
  );
}

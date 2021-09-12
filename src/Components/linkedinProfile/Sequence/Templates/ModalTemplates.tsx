import React from 'react';
import { Modal, Row, Select, Divider } from 'antd';
import { Action } from '../types';
import { useState } from 'react';
import InmailSave from './InmailSave';

const { Option } = Select;

type props = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ModalTemplates({ isVisible, setIsVisible }: props) {
  const [selected, setSelected] = useState<Action>('');
  const renderSelected = () => {
    switch (selected) {
      case 'Message':
        return 'Message';
      case 'Inmail':
        return <InmailSave setIsVisible={setIsVisible} />;
      default:
        return '';
    }
  };

  return (
    <Modal
      title="Select Template Option"
      visible={isVisible}
      onCancel={() => setIsVisible(false)}
      footer={null}
      style={{ minWidth: 800 }}
    >
      <Row justify="center">
        <Select
          onChange={(value: Action) => setSelected(value)}
          style={{ width: 120 }}
        >
          <Option value="Message">Message</Option>
          <Option value="Inmail">Inmail</Option>
        </Select>
      </Row>
      <Divider />
      {renderSelected()}
    </Modal>
  );
}

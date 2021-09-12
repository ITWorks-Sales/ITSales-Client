import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { useState } from 'react';
import ModalTemplates from './ModalTemplates';
export default function AddTemplate() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <>
      <Button icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
        Create New Template
      </Button>
      <ModalTemplates
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
      />
    </>
  );
}

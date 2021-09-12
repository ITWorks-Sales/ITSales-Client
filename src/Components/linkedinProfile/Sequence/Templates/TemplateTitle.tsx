import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react';
import { Template } from '../../../../api/types';
import { requestFieldsToTyped } from '../fieldsMisc';
import { InmailConfigType } from '../types';
import InmailSave from './InmailSave';

type props = {
  template: Template;
};

export default function TemplateTitle({ template }: props) {
  const [isVisible, setIsVisible] = useState(false);
  


  const title = template.fields.find((field) => field.key === 'templateName')
    ?.value;

  const initialValues = requestFieldsToTyped(
    template.fields
  ) as InmailConfigType;

  let modalChild;

  switch (template.type) {
    case 'Inmail':
      modalChild = (
        <InmailSave
          setIsVisible={setIsVisible}
          templateId={template.id}
          initialValues={initialValues}
        />
      );
      break;
    default:
      modalChild = 'lol';
      break;
  }

  const onClick = () => {
    setIsVisible(true);
  };

  return (
    <>
      <a onClick={onClick}>{title}</a>
      <Modal
        title={`Edit ${title}`}
        visible={isVisible}
        onCancel={() => setIsVisible(false)}
        footer={null}
        style={{ minWidth: 800 }}
      >
        {modalChild}
      </Modal>
    </>
  );
}

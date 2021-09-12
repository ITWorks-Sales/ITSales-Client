import { FormInstance, Row } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { requestFieldsToFormFields, objectToMinMaxFields } from '../fieldsMisc';
import selectedTemplateFields from '../atoms/selectedTemplateFields';
import { updateNodesFields } from '../../../../api/flows';
// import selectedTemplateFields from '.../atoms/selectedTemplateFields;
import templateTypeFilter from '../atoms/templateTypeFilter';
import InmailConfig from '../InmailConfig';
import PaginationTemplates from '../Templates/PaginationTemplates';
import { InmailConfigType } from '../types';
import ChooseTemplate from './ChooseTemplate';

type props = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  config: InmailConfigType;
  id: number;
};

export default ({ isVisible, setIsVisible, config, id }: props) => {
  const [form, setForm] = useState<FormInstance<any>>();
  const [areTemplatesVisible, setAreTemplatesVisible] = useState(false);
  const setTemplateType = useSetRecoilState(templateTypeFilter);
  const [templateFields, setTemplateFields] = useRecoilState(
    selectedTemplateFields
  );

  useEffect(() => {
    setTemplateType('Inmail');
  }, [areTemplatesVisible]);

  useEffect(() => {
    if (templateFields.length <= 0) return;
    let formData: {
      name: string | number | (string | number)[];
      value: any;
    }[] = [];

    templateFields.forEach((el) => {
      formData.push(requestFieldsToFormFields(el));
    });
    form?.setFields(formData);
    setTemplateFields([]);
  }, [templateFields]);

  const onOk = async () => {
    if (!form) return;
    try {
      await form.validateFields();

      const { message, title, state, ...minMaxes } = form.getFieldsValue();
      updateNodesFields({
        id,
        type: 'Inmail',
        inmailFields: {
          message: message,
          title: title,
          state: state,
          next_profile: {
            min: minMaxes.min_nextProfile,
            max: minMaxes.max_nextProfile,
          },
          click_message: {
            min: minMaxes.min_clickMessage,
            max: minMaxes.max_clickMessage,
          },
          click_send: {
            min: minMaxes.min_clickSend,
            max: minMaxes.max_clickSend,
          },
          insert_message: {
            min: minMaxes.min_insertMessage,
            max: minMaxes.max_insertMessage,
          },
          insert_title: {
            min: minMaxes.min_insertTitle,
            max: minMaxes.max_insertTitle,
          },
        },
      });

      setIsVisible(false);
    } catch (err) {}
  };

  return (
    <Modal
      title="Edit Inmail Config"
      visible={isVisible}
      onCancel={() => setIsVisible(false)}
      onOk={onOk}
      style={{ minWidth: 800 }}
      okText="Save"
    >
      <InmailConfig setForm={setForm} initialValues={config} />
      <Row justify="center">
        <a onClick={() => setAreTemplatesVisible(!areTemplatesVisible)}>
          Toggle Templates
        </a>
      </Row>
      {areTemplatesVisible ? (
        <>
          <ChooseTemplate />
          <PaginationTemplates />
        </>
      ) : (
        ''
      )}
    </Modal>
  );
};

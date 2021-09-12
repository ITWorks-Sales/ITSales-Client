import { atom } from 'recoil';
import { FormInstance } from 'antd';

const InmailForm = atom<FormInstance<any> | undefined>({
  key: 'InmailForm',
  default: undefined,
});

export default InmailForm;

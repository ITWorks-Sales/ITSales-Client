import { PoweroffOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ipcRenderer } from 'electron';
import React from 'react';
import { ILIProfile } from '../../../api/types';

// const openWindow = () => {
//   var profileWindow = new BrowserWindow({
//     width: 400,
//     height: 400,
//   });
// };

export default function StartProfileButton({
  LIProfile,
}: {
  LIProfile: ILIProfile;
}) {
  return (
    <Button
      icon={<PoweroffOutlined />}
      onClick={() =>
        ipcRenderer.send('createNewWindow', { profile: LIProfile })
      }
    >
      Start
    </Button>
  );
}

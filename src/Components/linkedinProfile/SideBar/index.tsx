import React from 'react';
import { Menu } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router';
import { useRecoilValue } from 'recoil';
import linkeidnProfileIdState from '../atoms/linkeidnProfileIdState';
import StateBox from './StateBox';

type setStateBoolean = React.Dispatch<React.SetStateAction<boolean>>;

const { SubMenu } = Menu;

const SideBar = ({ showBrowser }: { showBrowser: setStateBoolean }) => {
  const linkedinProfileId = useRecoilValue(linkeidnProfileIdState);
  const history = useHistory();

  const changePage = (
    isBrowserWindowRequired: boolean,
    newLocation: string
  ) => {
    const defaultRoute = `/linkedinProfile/${linkedinProfileId}`;
    showBrowser(isBrowserWindowRequired);
    history.push(`${defaultRoute}/${newLocation}`);
  };

  return (
    <>
      <Menu
        theme="dark"
        defaultSelectedKeys={['1']}
        mode="inline"
        style={{ minHeight: '80vh' }}
        id="profileSidebar"
      >
        <div className="logo"></div>
        <Menu.Item
          key="1"
          icon={<PieChartOutlined />}
          onClick={() => changePage(true, '')}
        >
          Browser
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<DesktopOutlined />}
          onClick={() => changePage(false, 'crm')}
        >
          CRM
        </Menu.Item>

        <Menu.Item key="3" onClick={() => changePage(false, 'actions')}>
          Actions
        </Menu.Item>

        <SubMenu key="sub2" icon={<TeamOutlined />} title="Sequences">
          <Menu.Item key="6" onClick={() => changePage(false, 'templates')}>
            Templates
          </Menu.Item>
          <Menu.Item key="8" onClick={() => changePage(false, 'flows')}>
            Flows
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="9" icon={<FileOutlined />}>
          Files
        </Menu.Item>
      </Menu>
      <StateBox />
    </>
  );
};

export default SideBar;

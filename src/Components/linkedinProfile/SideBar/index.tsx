import React from 'react';
import { Menu } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router';
import { useRecoilValue } from 'recoil';
import linkeidnProfileIdState from '../atoms/linkeidnProfileIdState';

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
    <Menu
      theme="dark"
      defaultSelectedKeys={['1']}
      mode="inline"
      style={{ minHeight: '100vh' }}
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
      <SubMenu key="sub1" icon={<UserOutlined />} title="User">
        <Menu.Item key="3">Tom</Menu.Item>
        <Menu.Item key="4">Bill</Menu.Item>
        <Menu.Item key="5">Alex</Menu.Item>
      </SubMenu>
      <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
        <Menu.Item key="6">Team 1</Menu.Item>
        <Menu.Item key="8">Team 2</Menu.Item>
      </SubMenu>
      <Menu.Item key="9" icon={<FileOutlined />}>
        Files
      </Menu.Item>
    </Menu>
  );
};

export default SideBar;

import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
  CloudServerOutlined,
} from '@ant-design/icons';
import { useHistory, useParams } from 'react-router';
import ProxyList from './ProxyList';
import LinkedinProfile from './LinkedinProfiles';

const { Header, Sider, Content } = Layout;

const HomeNavigation = () => {
  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory();
  const { page } = useParams<{ page: string }>();
  return (
    <Layout id="homeNavigation" style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo"></div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[page]}>
          <Menu.Item
            key="accounts"
            icon={<UserOutlined />}
            onClick={() => history.push(`/home/accounts`)}
          >
            Linkedin Accounts
          </Menu.Item>
          <Menu.Item
            key="proxy"
            icon={<CloudServerOutlined />}
            onClick={() => history.push('/home/proxy')}
          >
            Proxy List
          </Menu.Item>
          <Menu.Item
            key="logout"
            icon={<LogoutOutlined />}
            onClick={() => {
              localStorage.setItem('token', '');
              history.push('/');
            }}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 100,
          }}
        >
          {page === 'accounts' ? (
            <LinkedinProfile />
          ) : page === 'proxy' ? (
            <ProxyList />
          ) : (
            'Not Found'
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomeNavigation;

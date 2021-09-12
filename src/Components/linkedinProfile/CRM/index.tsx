import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout';
import React, { useEffect } from 'react';
import PaginationCRM from './PaginationCRM';
import Users from './Users';
import UploadUsers from './UploadUsers';
import TagManagement from './Tags';
import { Col, Divider, Row } from 'antd';
import Filters from './Filters';
import Drawer from './Drawer';
import { useSetRecoilState } from 'recoil';
import paginationNodeDetailsState from '../atoms/paginationNodeDetailsState';

const CRM = () => {
  const setPaginationNodeDetails = useSetRecoilState(
    paginationNodeDetailsState
  );
  useEffect(() => setPaginationNodeDetails(undefined), []);
  return (
    <Layout style={{ height: '100vh' }}>
      <Header>
        <UploadUsers />
        <Divider type="vertical" />
        <TagManagement />
      </Header>
      <Content>
        <Row justify="center" align="middle">
          <Col span={18}>
            <Users />
          </Col>
          <Filters />
        </Row>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <PaginationCRM />
      </Footer>
      <Drawer />
    </Layout>
  );
};

export default CRM;

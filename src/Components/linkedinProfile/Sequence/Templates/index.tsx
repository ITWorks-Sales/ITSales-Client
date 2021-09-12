import React, { useEffect } from 'react';
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout';
import { Col, Row, Divider } from 'antd';
import PaginationTemplates from './PaginationTemplates';
import TableTemplates from './TableTemplates';
import AddTemplate from './AddTemplate';
import Filters from './Filters';
import { useSetRecoilState } from 'recoil';
import templateTypeFilter from '../atoms/templateTypeFilter';
export default function Templates() {
  const setTemplateType = useSetRecoilState(templateTypeFilter);
  useEffect(() => setTemplateType(undefined), []);

  return (
    <>
      <Layout style={{ height: '100vh' }}>
        <Header>
          <AddTemplate />
          <Divider type="vertical" />
          <Filters />
        </Header>
        <Content>
          <Row justify="center" align="middle">
            <Col span={16}>
              <TableTemplates />
            </Col>
          </Row>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <PaginationTemplates />
        </Footer>
        {/* <Drawer /> */}
      </Layout>
    </>
  );
}

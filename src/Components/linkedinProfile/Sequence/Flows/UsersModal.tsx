import { Col, Divider, Row } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import paginationNodeDetailsState from '../../atoms/paginationNodeDetailsState';
import Filters from '../../CRM/Filters';
import PaginationCRM from '../../CRM/PaginationCRM';
import Users from '../../CRM/Users';
import isUsersModalVisibleState from '../atoms/isUsersModalVisibleState';
import ApplyFiltersButton from './ApplyFiltersButton';
import ImportUsersButton from './ImportUsersButton';

export default function UsersModal() {
  const [isUsersModalVisible, setIsUsersModalVisible] = useRecoilState(
    isUsersModalVisibleState
  );
  const nodeDetails = useRecoilValue(paginationNodeDetailsState);
  console.log(nodeDetails);
  return (
    <Modal
      visible={isUsersModalVisible}
      onCancel={() => setIsUsersModalVisible(false)}
      footer={false}
      style={{ minWidth: '90vw', minHeight: '80vh' }}
    >
      <Row justify="space-around">
        <Col span={18}>
          <Users />
        </Col>
        <Filters />
      </Row>
      <br />
      <Row justify="center">
        <Col span={14}>
          <Row justify="center">
            <PaginationCRM />
          </Row>
        </Col>

        <ApplyFiltersButton />
        <Divider type="vertical" style={{ height: 34 }} />
        {nodeDetails ? (
          nodeDetails.nodeType === 'Queue' ? (
            <ImportUsersButton />
          ) : (
            ''
          )
        ) : (
          ''
        )}
      </Row>
    </Modal>
  );
}

import React, { useState } from 'react';
import { Card, Row, Col, Divider } from 'antd';
import { InmailNodeData } from './types';
import { Handle, Position } from 'react-flow-renderer';
import { isValidConnection } from './handleValidation';
import InmailNodeEdit from './InmailNodeEdit';
import { useSetRecoilState } from 'recoil';
import paginationNodeDetailsState from '../../atoms/paginationNodeDetailsState';
import { usersType } from '../../../../api/types';
import isUsersModalVisibleState from '../atoms/isUsersModalVisibleState';

export default ({ data }: { data: InmailNodeData }) => {
  const { successUsersCount, failedUsersCount } = data.output || {};
  const [isVisible, setIsVisible] = useState(false);
  const setPaginationNodeDetails = useSetRecoilState(
    paginationNodeDetailsState
  );
  const setIsUsersModalVisible = useSetRecoilState(isUsersModalVisibleState);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const number = parseInt((e.target as HTMLElement).innerHTML);
    let type: usersType;
    if (number === successUsersCount) type = 'success_users';
    else type = 'failed_users';
    setPaginationNodeDetails({
      id: data.id,
      nodeType: 'Inmail',
      type,
    });
    setIsUsersModalVisible(true);
  };

  return (
    <>
      <InmailNodeEdit
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        config={data.config}
        id={data.id}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="inputUsers"
        isValidConnection={isValidConnection}
      />
      <Card
        title="Inmail Message"
        extra={<a onClick={() => setIsVisible(!isVisible)}>Edit</a>}
        style={{ width: 200 }}
      >
        <Row justify="center" style={{ paddingBottom: 10 }}>
          Profiles
        </Row>
        <Row style={{ textAlign: 'center' }}>
          <Col span={12}>
            Successuful:{'\n'} <a onClick={onClick}>{successUsersCount || 0}</a>
          </Col>
          <Col span={4}>
            <Divider type="vertical" style={{ height: 50 }} />
          </Col>
          <Col span={8}>
            Failed:{'\n'}
            <a onClick={onClick}>{failedUsersCount || 0}</a>
          </Col>
        </Row>
      </Card>

      <Handle
        type="source"
        position={Position.Bottom}
        id="outputUsersSuccess"
        style={{ left: '70%' }}
        isValidConnection={isValidConnection}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="OutputUsersFail"
        style={{ left: '30%' }}
        isValidConnection={isValidConnection}
      />
    </>
  );
};

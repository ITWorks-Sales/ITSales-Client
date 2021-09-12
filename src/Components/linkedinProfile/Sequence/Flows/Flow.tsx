import { PageHeader, Row } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { getFlowById } from '../../../../api/flows';
import selectedFlowId from '../atoms/selectedFlowId';
import ReactFlow from './ReactFlow';
import UsersModal from './UsersModal';

export default function Flow() {
  const [flowId, setSelectedFlowId] = useRecoilState(selectedFlowId);

  const { data: requestData } = useQuery(['flow', flowId], () =>
    getFlowById(flowId)
  );

  if (!requestData) return <span>No connection with the server</span>;

  const onBack = () => {
    setSelectedFlowId(0);
  };

  const { title } = requestData.data;

  return (
    <>
      <PageHeader className="sidebar-color" onBack={onBack} title={title} />
      <Row>
        <ReactFlow data={requestData.data} />
        <UsersModal />
      </Row>
    </>
  );
}

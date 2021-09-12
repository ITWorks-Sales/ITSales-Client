import React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { useSetRecoilState } from 'recoil';
import paginationNodeDetailsState from '../../atoms/paginationNodeDetailsState';
import isUsersModalVisibleState from '../atoms/isUsersModalVisibleState';
import { isValidConnection } from './handleValidation';
import { QueueNodeData } from './types';
export default ({ data }: { data: QueueNodeData }) => {
  const { incomingUsersCount, collectedUsersCount } = data;

  const setPaginationNodeDetails = useSetRecoilState(
    paginationNodeDetailsState
  );
  const setIsUsersModalVisible = useSetRecoilState(isUsersModalVisibleState);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    console.log(data);
    setPaginationNodeDetails({
      id: data.id,
      nodeType: 'Queue',
      type: '',
    });
    setIsUsersModalVisible(true);
  };
  return (
    <div
      style={{
        backgroundColor: '#177ddc',
        border: '1px solid transparent',
        borderRadius: 48,
        padding: '4px 15px',
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        id="queueInput"
        isValidConnection={isValidConnection}
      />
      <div
        style={{ textAlign: 'center', color: 'white', textDecoration: 'none' }}
      >
        Queue: {incomingUsersCount}
        <br />
        <a onClick={onClick} style={{ color: 'inherit' }}>
          Collected: {collectedUsersCount}
        </a>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="queueOutput"
        isValidConnection={isValidConnection}
      />
    </div>
  );
};

import React from 'react';
import { Space } from 'antd';
import { nodeType } from '../../../../api/types';

export default () => {
  const onDragStart = (event: React.DragEvent, nodeType: nodeType) => {
    if (!event.dataTransfer) return;

    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Space direction="vertical">
      <div>You can drag these nodes to the pane on the left.</div>
      <div onDragStart={(event) => onDragStart(event, 'Inmail')} draggable>
        Inmail Node
      </div>
      <div onDragStart={(event) => onDragStart(event, 'Queue')} draggable>
        Queue Node
      </div>
    </Space>
  );
};

import React, { useEffect } from 'react';
import ReactFlow, {
  addEdge,
  Connection,
  Controls,
  Edge,
  Elements,
  OnLoadParams,
  ReactFlowProvider,
  removeElements,
  updateEdge,
  Node,
  FlowElement,
  FlowTransform,
  getIncomers,
} from 'react-flow-renderer';
import { Row, Col } from 'antd';
import InmailNode from './InmailNode';
import QueueNode from './QueueNode';
import { useRef } from 'react';
import { useState } from 'react';
import DragAndDropSidebar from './DragAndDropSidebar';
import { Flow, nodeType } from '../../../../api/types';
import { CreateNodeDTO } from '../../../../api/flows/dto/create-node.dto';
import {
  createNode,
  updateFlow,
  updateNodesLocation,
  createEdge,
  updateEdge as updateEdgeServer,
  deleteNodes,
  deleteEdges,
} from '../../../../api/flows';
import { useQueryClient } from 'react-query';
import { InmailConfigType } from '../types';

const onDragOver = (event: React.DragEvent) => {
  event.preventDefault();
  event!.dataTransfer!.dropEffect = 'move';
};

function typeGuardIsEdge(toBeDetermined: any): toBeDetermined is Edge {
  if ((toBeDetermined as Edge).source) return true;
  return false;
}

// const tgIsEdge(tbd: any): tdb is Edge<T> => {//return true if animal}

export default ({ children, data }: { children?: any; data: Flow }) => {
  const flowId = data.id;
  const queryClient = useQueryClient();
  const reactFlowWrapper = useRef<any>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<OnLoadParams>();
  const [elements, setElements] = useState<Elements>([]);

  const invalidateFlow = () => queryClient.invalidateQueries(['flow', flowId]);

  const onConnect = async (params: Connection | Edge) => {
    const edge = params as Edge;
    edge;
    const {
      source,
      target,
      sourceHandle: source_handle,
      targetHandle: target_handle,
    } = edge;
    if (source && target && source_handle && target_handle) {
      const {
        data: { id: edgeId },
      } = await createEdge({
        flowId,
        source,
        target,
        source_handle,
        target_handle,
      });

      edge.id = edgeId + '';

      setElements((els) => addEdge(edge, els));
    }
    invalidateFlow();
  };

  useEffect(
    () =>
      reactFlowInstance?.setTransform({
        x: data.view_x,
        y: data.view_y,
        zoom: data.zoom,
      }),
    [data]
  );

  const onLoad = (_reactFlowInstance: OnLoadParams) => {
    const { view_y, view_x, zoom } = data;
    _reactFlowInstance.setTransform({
      x: view_x,
      y: view_y,
      zoom: zoom,
    });
    setReactFlowInstance(_reactFlowInstance);
  };

  const onElementsRemove = async (elementsToRemove: Elements) => {
    const nodes: {
      type: nodeType;
      id: number;
    }[] = [];
    const edges: number[] = [];
    elementsToRemove.forEach(async (el: FlowElement) => {
      //send request to remove the elemnts
      if (typeGuardIsEdge(el)) {
        edges.push(parseInt(el.id));
      } else {
        const split = el.id.split('_');
        nodes.push({ id: parseInt(split[0]), type: split[1] as nodeType });
      }
    });
    await Promise.all([
      deleteNodes({ nodes: nodes }),
      deleteEdges({ edgeIds: edges }),
    ]);
    setElements((els) => removeElements(elementsToRemove, els));
    invalidateFlow();
  };

  const onEdgeUpdate = async (oldEdge: Edge, newConnection: Connection) => {
    const { target, source, sourceHandle, targetHandle } = newConnection;
    if (!target || !source || !sourceHandle || !targetHandle) return;
    const edge = {
      id: parseInt(oldEdge.id),
      target,
      source,
      source_handle: sourceHandle,
      target_handle: targetHandle,
    };
    await updateEdgeServer(edge);
    setElements((els) => updateEdge(oldEdge, newConnection, els));
    invalidateFlow();
  };

  useEffect(() => {
    console.time('Entire Loading');
    const { inmail_nodes, queue_nodes, edges } = data;

    let nodes: Node[] = [];

    inmail_nodes.forEach((node) => {
      const {
        id,
        position_x: x,
        position_y: y,
        success_users_count: successUsersCount,
        failed_users_count: failedUsersCount,
        title,
        message,
        state,
        next_profile,
        click_message,
        click_send,
        insert_message,
        insert_title,
      } = node;

      const config: InmailConfigType = {
        title,
        message,
        state,
        min_nextProfile: next_profile.min,
        max_nextProfile: next_profile.max,
        min_clickMessage: click_message.min,
        max_clickMessage: click_message.max,
        min_clickSend: click_send.min,
        max_clickSend: click_send.max,
        min_insertMessage: insert_message.min,
        max_insertMessage: insert_message.max,
        min_insertTitle: insert_title.min,
        max_insertTitle: insert_title.max,
      };

      nodes.push({
        type: 'Inmail',
        id: `${id}_Inmail`,
        position: { x, y },
        data: { id, output: { successUsersCount, failedUsersCount }, config },
      });
    });

    queue_nodes.forEach((node) => {
      const { id, collected_users_count, position_x: x, position_y: y } = node;
      const nodeToPush = {
        type: 'Queue',
        id: `${id}_Queue`,
        position: { x, y },
        data: {
          id,
          incomingUsersCount: 0,
          collectedUsersCount: collected_users_count,
        },
      };
      nodes.push(nodeToPush);
    });

    let els: Elements<any> = [...nodes];
    console.time('edges');
    edges.forEach((edge) => {
      const newEdge = {
        id: edge.id + '',
        target: edge.target,
        source: edge.source,
        targetHandle: edge.target_handle,
        sourceHandle: edge.source_handle,
      } as Edge;

      els = addEdge(newEdge, els);
    });
    console.timeEnd('edges');
    setElements(els);
    console.time('Update Queues'); // <--- usually takes the most time, because of big time complexity
    updateQueues();
    console.timeEnd('Update Queues');
    console.timeEnd('Entire Loading');
  }, [data]);

  const updateQueues = () => {
    const queueNodes = elements.filter((el) => el.type === 'Queue') as Node[];
    for (let node of queueNodes) {
      let usersCount = 0;
      console.log(elements, node);
      console.log(getIncomers(node, elements));
      for (let incomer of getIncomers(node, elements)) {
        for (const [_, value] of Object.entries(incomer.data.output || {})) {
          usersCount += value as number;
        }
      }

      node.data.incomingUsersCount = usersCount;
      setElements((els) => els.map((el) => (el.id === node.id ? node : el)));
    }
  };

  useEffect(updateQueues, [elements.length]);

  // const onEdgeRemove = (oldEdge: Edge, newConnection: Connection) =>
  //   setElements((els) => (oldEdge, newConnection, els));

  const onDrop = async (event: React.DragEvent) => {
    event.preventDefault();

    if (reactFlowInstance) {
      const reactFlowBounds =
        reactFlowWrapper!.current!.getBoundingClientRect();
      const type = event!.dataTransfer!.getData(
        'application/reactflow'
      ) as nodeType;
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const createNodeDto: CreateNodeDTO = {
        flowId,
        position_x: position.x,
        position_y: position.y,
        type,
      };

      const { data: node } = await createNode(createNodeDto);
      const { id } = node;

      const newNode: Node = {
        id: `${id}_${type}`,
        type,
        position,
        data: { label: `${type} node` },
      };

      setElements((es) => es.concat(newNode));
    }
  };

  const onMoveEnd = (flowTransform?: FlowTransform) => {
    if (!flowTransform) return;
    updateFlow({
      ...flowTransform,
      id: flowId,
    });
    queryClient.setQueryData(['flow', flowId], (flow: Flow | undefined) => {
      if (!flow)
        return {
          id: 1,
          zoom: 1,
          view_x: 0,
          view_y: 0,
          title: 'unknown',
          inmail_nodes: [],
          queue_nodes: [],
          edges: [],
        };
      flow.view_x = flowTransform.x;
      flow.view_y = flowTransform.y;
      flow.zoom = flowTransform.zoom;
      return flow;
    });
  };

  const onNodeDragStop = async (_: any, node: Node) => {
    const { type, position, id } = node;
    if (!type) return;

    await updateNodesLocation({ nodes: [{ id, type, position }] });

    invalidateFlow();
  };

  const onSelectionDragStop = async (_: any, nodes: Node[]) => {
    const updatedNodes = [];
    for (const node of nodes) {
      const { type, position, id } = node;
      if (!type) continue;
      updatedNodes.push({ id, type, position });
    }
    await updateNodesLocation({ nodes: updatedNodes });
  };

  return (
    <ReactFlowProvider>
      <Col span={24} style={{ height: '90vh' }} ref={reactFlowWrapper}>
        <ReactFlow
          elements={elements}
          onConnect={onConnect}
          onElementsRemove={onElementsRemove}
          onLoad={onLoad}
          onEdgeUpdate={onEdgeUpdate}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onMoveEnd={onMoveEnd}
          nodeTypes={{ Inmail: InmailNode, Queue: QueueNode }}
          onNodeDragStop={onNodeDragStop}
          onSelectionDragStop={onSelectionDragStop}
        >
          <Controls />
          <Row
            justify="end"
            style={{ position: 'absolute', zIndex: 5, top: 5, right: 10 }}
          >
            <DragAndDropSidebar />
          </Row>
        </ReactFlow>
      </Col>
    </ReactFlowProvider>
  );
};

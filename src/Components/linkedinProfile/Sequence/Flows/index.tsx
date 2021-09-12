import React from 'react';
import { useRecoilValue } from 'recoil';
import selectedFlow from '../atoms/selectedFlowId';
import FlowSelector from './FlowSelector';
import Flow from './Flow';

export default function Flows() {
  const selectedFlowId = useRecoilValue(selectedFlow);

  return <div>{selectedFlowId === 0 ? <FlowSelector /> : <Flow />}</div>;
}

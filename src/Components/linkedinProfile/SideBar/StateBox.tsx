import React from 'react';

import { Card, Avatar } from 'antd';
import { useWebViewInteraction } from '../WebViewInteractionContext';
import { useRecoilValue } from 'recoil';
import interactionState from '../atoms/interactionState';

const { Meta } = Card;

export default function StateBox() {
  const { interaction } = useWebViewInteraction();
  const interactionStateValue = useRecoilValue(interactionState);
  if (!interaction) return <span>WebView was not loaded</span>;

  return (
    <>
      <Card style={{ height: '25vh' }} title={interactionStateValue}>
        <Meta
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          title="John Smith"
          description="This is the description"
        />
      </Card>
    </>
  );
}

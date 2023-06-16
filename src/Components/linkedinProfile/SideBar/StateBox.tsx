import React from 'react';

import { Card, Avatar } from 'antd';
import { useWebViewInteraction } from '../WebViewInteractionContext';
import { useRecoilValue } from 'recoil';
import stateBoxState from '../BrowserWindow/atoms/stateBoxState';

const { Meta } = Card;

export default function StateBox() {
  const { interaction } = useWebViewInteraction();
  const { title, meta } = useRecoilValue(stateBoxState);
  const { src, description } = meta;
  if (!interaction) return <span>WebView was not loaded</span>;
  console.log('rerendered');
  return (
    <>
      <Card style={{ height: '25vh' }} title={title}>
        <Meta
          avatar={<Avatar src={src} />}
          title={meta.title}
          description={description}
        />
      </Card>
    </>
  );
}

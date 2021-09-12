import React from 'react';
import { Button } from 'antd';
import { useWebViewInteraction } from '../WebViewInteractionContext';

export default function SNCollecting() {
  const { interaction } = useWebViewInteraction();
  if (!interaction) return <span>Webview is undefined</span>;

  return (
    <Button
      type="primary"
      onClick={() => {
        interaction.startCollecting('SN_SEARCH_PEOPLE_URL', 0);
      }}
    >
      Start SN collecting
    </Button>
  );
}

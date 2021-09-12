import React from 'react';
import { Button } from 'antd';
import { useWebViewInteraction } from '../WebViewInteractionContext';

export default function Login() {
  const { interaction } = useWebViewInteraction();
  if (!interaction) return <span>Webview is undefined</span>;

  // interaction.login();
  return (
    <Button
      type="primary"
      onClick={() => {
        interaction.login();
      }}
    >
      Login
    </Button>
  );
}

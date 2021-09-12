import { Button } from 'antd';
import React from 'react';
import { useRecoilValue } from 'recoil';
import paginationNodeDetailsState from '../../atoms/paginationNodeDetailsState';
import { useWebViewInteraction } from '../../WebViewInteractionContext';

export default () => {
  const nodeDetails = useRecoilValue(paginationNodeDetailsState);
  const { interaction } = useWebViewInteraction();

  if (!interaction) return <span>No webview object detected</span>;
  if (!nodeDetails) return <span>No nodeDetails object detected </span>;

  return (
    <Button
      type="primary"
      onClick={() => {
        interaction.startCollecting('SN_SEARCH_PEOPLE_URL', nodeDetails.id);
      }}
    >
      Import from SN
    </Button>
  );
};

import React from 'react';
import { useRecoilValue } from 'recoil';
import campaignRunningState from './atoms/campaignRunningState';
import BrowserTabs from './tabs';

export default function BrowserWindowView() {
  const isRunning = useRecoilValue(campaignRunningState);

  const styles: React.CSSProperties = {};

  if (isRunning) {
    styles.pointerEvents = 'none';
    styles.opacity = 0.4;
  }

  return (
    <div style={styles}>
      <BrowserTabs />
    </div>
  );
}

import React from 'react';
import ProfileIdContext from './ProfileIdContext';
import BrowserTabs from './tabs';

export default function BrowserWindowView({ id }: { id: string }) {
  return (
    <ProfileIdContext.Provider value={id}>
      <BrowserTabs />
    </ProfileIdContext.Provider>
  );
}

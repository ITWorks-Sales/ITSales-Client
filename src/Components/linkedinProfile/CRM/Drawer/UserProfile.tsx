import React from 'react';
import CollapsableInfo from './CollapsableInfo';
import Header from './Header';

export default function UserProfile() {
  return (
    <div style={{ paddingTop: 25 }}>
      <Header />
      <br />
      <CollapsableInfo />
    </div>
  );
}

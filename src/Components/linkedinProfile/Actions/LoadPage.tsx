import { Input, Button } from 'antd';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import linkedinWebviewState from '../atoms/linkedinWebviewState';

export default function LoadPage() {
  const webView = useRecoilValue(linkedinWebviewState);
  const [newUrl, setNewUrl] = useState('');

  return (
    <>
      <Input
        value={newUrl}
        onChange={(e) => {
          setNewUrl(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          webView.send('loadPage', newUrl);
        }}
      >
        Load Page
      </Button>
    </>
  );
}

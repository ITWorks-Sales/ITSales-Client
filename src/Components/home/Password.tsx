import { Button } from '@material-ui/core';
import React, { useState } from 'react';

export default function Password({ password }: { password: string }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <span>{show ? password : password.replaceAll(/./g, '*')}</span>
      <Button onClick={() => setShow(show ? false : true)}>
        {show ? 'Hide' : 'Show'}
      </Button>
    </div>
  );
}

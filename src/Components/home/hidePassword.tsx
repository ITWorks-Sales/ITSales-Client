import { Button, Typography } from '@material-ui/core';
import React, { useState } from 'react';

export default function HidePassword(props: any) {
  const { password } = props;
  const [state, setState] = useState(false);
  return (
    <>
      <Typography>{state ? password : ''}</Typography>
      <Button size="small" onClick={() => setState(state ? false : true)}>
        {state ? 'Hide' : 'Show'}
      </Button>
    </>
  );
}

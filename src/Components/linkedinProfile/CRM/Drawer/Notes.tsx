import { Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { updateLinkedinUser } from '../../../../api/linkedinUser';
import { ILIUser } from '../../../../api/types';

type props = { liUser: ILIUser };

const triggerChange = (id: number, notes: string) => {
  updateLinkedinUser({ id, notes });
};

export default function Notes({ liUser: { notes: userNotes, id } }: props) {
  const [notes, setNotes] = useState<string>();
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  useEffect(() => {
    setNotes(userNotes);
  }, [userNotes]);

  return (
    <Input.TextArea
      value={notes}
      autoSize={{ minRows: 3 }}
      onChange={(e) => {
        if (timer) clearTimeout(timer);
        setNotes(e.target.value);
        setTimer(
          setTimeout(() => {
            triggerChange(id, e.target.value);
          }, 700)
        );
      }}
    />
  );
}

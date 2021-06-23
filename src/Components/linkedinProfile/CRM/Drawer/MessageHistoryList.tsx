import { Collapse } from 'antd';
import React from 'react';
import { ILIUser } from '../../../../api/types';
import MessageHistory from './MessageHistory';

type props = { liUser: ILIUser };

export default function MessageHistoryList({ liUser }: props) {
  const messageHistories = liUser.message_histories;
  return (
    <Collapse
      bordered={false}
      style={{ border: 0 }}
      collapsible={messageHistories.length ? undefined : 'disabled'}
    >
      {messageHistories
        ? messageHistories.map((messageHistory, index) => (
            <MessageHistory
              messageHistory={messageHistory}
              liUser={liUser}
              key={index}
            />
          ))
        : ''}
    </Collapse>
  );
}

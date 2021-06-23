import { Collapse, Typography } from 'antd';
import React from 'react';
import { useRecoilValue } from 'recoil';
import userInfoDrawerState from '../atoms/userInfoDrawerState';
import MessageHistory from './MessageHistoryList';
import Notes from './Notes';
import WorkHistory from './WorkHistory';

const { Text } = Typography;

export default function CollapsableInfo() {
  const liUser = useRecoilValue(userInfoDrawerState);
  const { summary } = liUser;
  return (
    <Collapse bordered={false} style={{ border: 0 }}>
      <Collapse.Panel
        header="Summary"
        key="1"
        collapsible={summary ? undefined : 'disabled'}
      >
        {summary ? <Text>{summary}</Text> : <></>}
      </Collapse.Panel>
      <Collapse.Panel header="Work History" key="2">
        <WorkHistory liUser={liUser} />
      </Collapse.Panel>
      <Collapse.Panel header="Notes" key="3">
        <Notes liUser={liUser} />
      </Collapse.Panel>
      <Collapse.Panel header="Message History" key="4">
        <MessageHistory liUser={liUser} />
      </Collapse.Panel>
    </Collapse>
  );
}

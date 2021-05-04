import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import ProfileWebView from './ProfileWebView';
import * as _ from 'lodash';
const { TabPane } = Tabs;

type Panes = {
  title: string;
  content: string | JSX.Element;
  key: string;
  closable?: boolean;
};

const onChange = (
  activeKey: targetKeyType,
  setActiveKey: React.Dispatch<React.SetStateAction<targetKeyType>>
) => {
  setActiveKey(activeKey);
};

type targetKeyType =
  | string
  | React.MouseEvent<Element, MouseEvent>
  | React.KeyboardEvent<Element>;

let newTabIndex = 1;
const BrowserTabs = () => {
  const [activeKey, setActiveKey]: any = useState('1');
  const [panes, setPanes] = useState<Panes[]>([]);

  const changePaneTitle = (key: string, title: string) => {
    title = title.length > 25 ? title.substring(0, 23) + '...' : title;
    setPanes((panes) =>
      [
        ..._.filter(panes, (p: Panes) => p.key !== key),
        {
          ..._.find(panes, { key }),
          title,
        },
      ].sort((a, b) => parseInt(a.key) - parseInt(b.key))
    );
  };

  const initialPanes = [
    {
      title: 'Linkedin',
      content: (
        <ProfileWebView
          webViewId="1"
          changePaneTitle={changePaneTitle}
          startPage="https://whatismyipaddress.com/"
        />
      ),
      key: '1',
      closable: false,
    },
  ];
  useEffect(() => {
    setPanes(initialPanes);
  }, []);
  const add = (newTabIndex: number, panes: Panes[]) => {
    const activeKey = `${newTabIndex++}`;
    const newPanes = [...panes];
    newPanes.push({
      title: 'Google',
      content: (
        <ProfileWebView
          webViewId={activeKey}
          changePaneTitle={changePaneTitle}
          startPage="https://google.com"
        />
      ),

      key: activeKey,
    });
    console.log(newPanes);
    setPanes(newPanes);
    setActiveKey(activeKey);
  };

  const remove = (targetKey: targetKeyType, panes: Panes[]) => {
    let newActiveKey = activeKey;
    let lastIndex: number;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = panes.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex! >= 0) {
        newActiveKey = newPanes[lastIndex!].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setPanes(newPanes);
    setActiveKey(newActiveKey);
  };

  const onEdit = (targetKey: targetKeyType, action: 'add' | 'remove') => {
    console.log(typeof targetKey, targetKey);
    if (action === 'add') {
      newTabIndex++;
      add(newTabIndex, panes);
    }
    if (action === 'remove') remove(targetKey, panes);
  };

  return (
    <Tabs
      type="editable-card"
      onChange={(activeKey) => {
        onChange(activeKey, setActiveKey);
      }}
      activeKey={activeKey}
      onEdit={onEdit}
      style={{ height: '100vh' }}
    >
      {panes.map((pane) => (
        <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
          {pane.content}
        </TabPane>
      ))}
    </Tabs>
  );
};

export default BrowserTabs;

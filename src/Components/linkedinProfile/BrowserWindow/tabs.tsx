import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import ProfileWebView from './ProfileWebView';
import * as _ from 'lodash';
import { useRecoilState } from 'recoil';
import panesState from './atoms/panesState';
import { Pane, targetKeyType } from './types';
import activeKeyState from './atoms/activeKeyState';
import newTabIndexState from './atoms/newTabIndex';
const { TabPane } = Tabs;

const onChange = (
  activeKey: targetKeyType,
  setActiveKey: React.Dispatch<React.SetStateAction<targetKeyType>>
) => {
  setActiveKey(activeKey);
};

const BrowserTabs = () => {
  const [activeKey, setActiveKey] = useRecoilState(activeKeyState);
  const [panes, setPanes] = useRecoilState(panesState);
  const [newTabIndex, setNewTabIndex] = useRecoilState(newTabIndexState);

  const changePaneTitle = (key: string, title: string = 'New Window') => {
    title = title.length > 25 ? title.substring(0, 23) + '...' : title;
    setPanes((panes) =>
      [
        ..._.filter(panes, (p: Pane) => p.key !== key),
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
  const add = (newTabIndex: number, panes: Pane[]) => {
    const activeKey = `${newTabIndex}`;
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
    setNewTabIndex(newTabIndex);
    setPanes(newPanes);
    setActiveKey(activeKey);
    console.log(newPanes);
  };

  const remove = (targetKey: targetKeyType, panes: Pane[]) => {
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
      add(newTabIndex + 1, panes);
    }
    if (action === 'remove') remove(targetKey, panes);
  };

  return (
    <Tabs
      type="editable-card"
      onChange={(activeKey) => {
        onChange(activeKey, setActiveKey);
      }}
      activeKey={activeKey as string}
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

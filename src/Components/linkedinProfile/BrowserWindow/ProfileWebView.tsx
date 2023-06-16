import { WebviewTag } from 'electron';
import { PageTitleUpdatedEvent } from 'electron/main';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import AdressBar from './AdressBar';
import path from 'path';
import { useSetRecoilState } from 'recoil';
import * as _ from 'lodash';
import { WebViewInteraction } from '../../../WebViewInteraction';
import { getLinkedinProfiles } from '../../../api/linkedinProfile';
import { useWebViewInteraction } from '../WebViewInteractionContext';
import interactionAction from '../atoms/interactionAction';
import {
  getRecoilExternalLoadable,
  setRecoilExternalState,
} from '../../../RecoilExternalStatePortal';
import newTabIndexState from './atoms/newTabIndex';
import panesState from './atoms/panesState';
import { Pane } from './types';
import activeKeyState from './atoms/activeKeyState';
import stateBoxState from './atoms/stateBoxState';
import campaignRunningState from './atoms/campaignRunningState';

const addTab = (startPage: string) => {
  const get = getRecoilExternalLoadable;
  const set = setRecoilExternalState;
  const newTabIndex = get(newTabIndexState);
  const activeKey = `${newTabIndex.contents + 1}`;

  const changePaneTitle = (key: string, title: string) => {
    title = title.length > 25 ? title.substring(0, 23) + '...' : title;
    set(panesState, (panes) =>
      [
        ..._.filter(panes, (p: Pane) => p.key !== key),
        {
          ..._.find(panes, { key }),
          title,
        },
      ].sort((a, b) => parseInt(a.key) - parseInt(b.key))
    );
  };

  set(panesState, (panes) =>
    panes.concat({
      title: 'New Window',
      content: (
        <ProfileWebView
          webViewId={activeKey}
          changePaneTitle={changePaneTitle}
          startPage={startPage}
        />
      ),

      key: activeKey,
    })
  );

  set(newTabIndexState, (index) => index + 1);
  set(activeKeyState, activeKey);
};

export default function ProfileWebView({
  webViewId,
  changePaneTitle,
  startPage,
}: {
  webViewId: string;
  changePaneTitle: any;
  startPage: string;
}) {
  const { id: profileId } = useParams<{ id: string }>();
  const { setInteraction } = useWebViewInteraction();
  const setStateBox = useSetRecoilState(stateBoxState);
  const setInteractionAction = useSetRecoilState(interactionAction);
  const setBlockUserInput = useSetRecoilState(campaignRunningState);
  const webViewSelector = `webview[data-webviewid="${webViewId}"]`;

  const [webView, setWebView] = useState<WebviewTag | undefined>();
  useEffect(() => {
    const copyOfWebView = document.querySelector(webViewSelector) as WebviewTag;
    let oldTitle = '';

    setWebView(copyOfWebView);

    copyOfWebView.addEventListener('page-title-updated', ((
      e: PageTitleUpdatedEvent
    ) => {
      const { title } = e;
      if (title !== oldTitle) changePaneTitle(webViewId, title);
      oldTitle = title;
    }) as EventListener);

    copyOfWebView.addEventListener('dom-ready', () =>
      copyOfWebView.openDevTools()
    );

    copyOfWebView.addEventListener('new-window', async (e) => {
      addTab(e.url);
    });

    const initWebViewInteraction = async () => {
      const { data: liProfiles } = await getLinkedinProfiles();

      const profile = liProfiles.find((x) => x.id == parseInt(profileId));

      if (!profile) {
        throw new Error(
          `Couldn't load current profile at initWebViewInteraction`
        );
      }

      const interaction = new WebViewInteraction(
        copyOfWebView,
        profile!,
        setStateBox,
        setInteractionAction,
        setBlockUserInput
      );

      setInteraction(interaction);
    };
    initWebViewInteraction();
  }, []);
  return (
    <>
      <>
        <AdressBar webView={webView!} />
      </>

      <webview
        data-webviewid={webViewId}
        src={startPage}
        partition={`persist:${profileId}`}
        preload={path.resolve(__dirname, './preload/dist/index.js')}
        style={{
          display: 'inline-flex',
          minWidth: 1280,
          minHeight: 720,
          width: '100%',
          height: 'calc(100vh - 98px)',
        }}
      ></webview>
    </>
  );
}

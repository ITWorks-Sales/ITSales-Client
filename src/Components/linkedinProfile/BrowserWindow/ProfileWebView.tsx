import { WebviewTag } from 'electron';
import { PageTitleUpdatedEvent } from 'electron/main';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import AdressBar from './AdressBar';
import path from 'path';
import { useRecoilState } from 'recoil';
import linkedinWebviewState from '../atoms/linkedinWebviewState';

export default function ProfileWebView({
  webViewId,
  changePaneTitle,
  startPage,
}: {
  webViewId: string;
  changePaneTitle: any;
  startPage: string;
}) {
  const { id } = useParams<{ id: string }>();
  const webViewSelector = `webview[data-webviewid="${webViewId}"]`;

  const [webViewState, setWebViewState] = useRecoilState(linkedinWebviewState);
  useEffect(() => {
    const copyOfWebView = document.querySelector(webViewSelector) as WebviewTag;
    let oldTitle = '';
    setWebViewState(copyOfWebView);
    console.log(webViewState, copyOfWebView);
    copyOfWebView?.addEventListener('page-title-updated', ((
      e: PageTitleUpdatedEvent
    ) => {
      const { title } = e;
      if (title !== oldTitle) changePaneTitle(webViewId, title);
      oldTitle = title;
    }) as EventListener);
    copyOfWebView.addEventListener('dom-ready', () =>
      copyOfWebView.openDevTools()
    );
  }, []);
  return (
    <>
      <AdressBar webView={webViewState} />
      <webview
        data-webviewid={webViewId}
        src={startPage}
        partition={`persist:${id}`}
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

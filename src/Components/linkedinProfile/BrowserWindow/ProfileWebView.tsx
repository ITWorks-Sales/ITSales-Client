import { WebviewTag } from 'electron';
import { PageTitleUpdatedEvent } from 'electron/main';
import React, { useEffect, useState } from 'react';
import AdressBar from './AdressBar';
import ProfileIdContext from './ProfileIdContext';

export default function ProfileWebView({
  webViewId,
  changePaneTitle,
  startPage,
}: {
  webViewId: string;
  changePaneTitle: any;
  startPage: string;
}) {
  const id = React.useContext(ProfileIdContext);
  const webViewSelector = `webview[data-webviewid="${webViewId}"]`;
  const [webView, setWebView] = useState<WebviewTag>(
    document.querySelector(webViewSelector) as WebviewTag
  );
  useEffect(() => {
    const copyOfWebView = document.querySelector(webViewSelector) as WebviewTag;
    let oldTitle = '';
    setWebView(copyOfWebView);
    copyOfWebView?.addEventListener('page-title-updated', ((
      e: PageTitleUpdatedEvent
    ) => {
      const { title } = e;
      if (title !== oldTitle) changePaneTitle(webViewId, title);
      oldTitle = title;
    }) as EventListener);
  }, []);
  return (
    <>
      <AdressBar webView={webView} />
      <webview
        data-webviewid={webViewId}
        src={startPage}
        partition={`persist:${id}`}
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

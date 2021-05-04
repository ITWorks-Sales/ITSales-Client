import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  LinkedinOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import Search from 'antd/lib/input/Search';
import { WebviewTag } from 'electron';
import { DidNavigateEvent } from 'electron/main';
import React, { useEffect, useState } from 'react';

const refreshPage = (webView: WebviewTag) => {
  webView.reload();
};

function isValidURL(str: string) {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return !!pattern.test(str);
}

const accessPage = async (webView: WebviewTag, input: string) => {
  if (isValidURL(input)) {
    try {
      await webView.loadURL(input);
    } catch (err) {
      webView.loadURL(
        `http://google.com/search?q=${encodeURIComponent(input)}`
      );
    }
    return;
  }
  return webView.loadURL(
    `http://google.com/search?q=${encodeURIComponent(input)}`
  );
};

const AdressBar = ({ webView }: { webView: WebviewTag }) => {
  const [searchValue, setSearchValue] = useState('');
  const [backDisabled, setBackDisabled] = useState(true);
  const [forwardDisabled, setForwardDisabled] = useState(true);
  useEffect(() => {
    if (!webView) return;
    webView.addEventListener('dom-ready', () => {
      setSearchValue(webView.getURL());
    });
    webView.addEventListener('did-navigate', ((e: DidNavigateEvent) => {
      const { url } = e;
      setSearchValue(url);
      setBackDisabled(!webView.canGoBack());
      setForwardDisabled(!webView.canGoForward());
    }) as EventListener);
  }, [webView]);
  return (
    <>
      <Row justify="center" style={{ paddingBottom: 10 }}>
        <Col style={{ paddingRight: 15 }}>
          <Button
            shape="circle"
            icon={<ArrowLeftOutlined />}
            onClick={() => webView.goBack()}
            disabled={backDisabled}
          />
          <Button
            shape="circle"
            icon={<ArrowRightOutlined />}
            onClick={() => webView.goForward()}
            disabled={forwardDisabled}
            style={{ marginLeft: 3 }}
          />
        </Col>

        <Col span={16}>
          <Search
            type="search"
            placeholder="input search text"
            enterButton="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onPressEnter={() => {
              accessPage(webView, searchValue);
            }}
          />
        </Col>

        <Col style={{ paddingLeft: 10 }}>
          <Button
            shape="circle"
            icon={<ReloadOutlined />}
            onClick={() => refreshPage(webView)}
          />
        </Col>
        <Col offset={1}>
          <Button
            icon={<LinkedinOutlined />}
            onClick={() => accessPage(webView, 'https://linkedin.com')}
          />
        </Col>
      </Row>
    </>
  );
};

export default AdressBar;

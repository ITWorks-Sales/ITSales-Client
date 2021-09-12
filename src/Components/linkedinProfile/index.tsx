import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { WebViewInteraction } from '../../WebViewInteraction';
import Actions from './Actions';
import linkeidnProfileIdState from './atoms/linkeidnProfileIdState';
import BrowserWindowView from './BrowserWindow';
import CRM from './CRM';
import SideBar from './SideBar';
import Templates from './Sequence/Templates';
import { WebViewInteractionContext } from './WebViewInteractionContext';
import Flows from './Sequence/Flows';

export default function LinkedinProfile() {
  const { id } = useParams<{ id: string }>();
  const setlinkedinProfileId = useSetRecoilState(linkeidnProfileIdState);

  const [interaction, setInteraction] = useState<
    WebViewInteraction | undefined
  >();

  useEffect(() => {
    setlinkedinProfileId(parseInt(id));
  }, []);

  const defaultLink = `/linkedinProfile/${id}`;
  const [showBrowser, setShowBrowser] = useState(true);

  return (
    <WebViewInteractionContext.Provider value={{ interaction, setInteraction }}>
      <Row>
        <Col span={4}>
          <SideBar showBrowser={setShowBrowser} />
        </Col>
        <Col span={20}>
          <Switch>
            <Route path={`${defaultLink}/crm`} component={CRM} />
            <Route path={`${defaultLink}/actions`} component={Actions} />
            <Route path={`${defaultLink}/templates`} component={Templates} />
            <Route path={`${defaultLink}/flows`} component={Flows} />
          </Switch>
          <div className={showBrowser ? '' : 'hidden'}>
            <BrowserWindowView />
          </div>
        </Col>
      </Row>
    </WebViewInteractionContext.Provider>
  );
}

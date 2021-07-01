import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import Actions from './Actions';
import linkeidnProfileIdState from './atoms/linkeidnProfileIdState';
import BrowserWindowView from './BrowserWindow';
import CRM from './CRM';
import SideBar from './SideBar';
export default function LinkedinProfile() {
  const { id } = useParams<{ id: string }>();
  const setlinkedinProfileId = useSetRecoilState(linkeidnProfileIdState);

  useEffect(() => setlinkedinProfileId(parseInt(id)), []);

  const defaultLink = `/linkedinProfile/${id}`;
  const [showBrowser, setShowBrowser] = useState(true);

  return (
    <Row>
      <Col span={3}>
        <SideBar showBrowser={setShowBrowser} />
      </Col>
      <Col span={21}>
        <Switch>
          <Route path={`${defaultLink}/crm`} component={CRM} />
          <Route path={`${defaultLink}/actions`} component={Actions} />
        </Switch>
        <div className={showBrowser ? '' : 'hidden'}>
          <BrowserWindowView />
        </div>
      </Col>
    </Row>
  );
}

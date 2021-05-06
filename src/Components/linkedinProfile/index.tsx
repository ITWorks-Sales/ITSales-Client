import { Col, Row } from 'antd';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import BrowserWindowView from './BrowserWindow';
import CRM from './CRM';
import SideBar from './SideBar/SideBar';
export default function LinkedinProfile() {
  const { id } = useParams<{ id: string }>();
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
        </Switch>
        <div className={showBrowser ? '' : 'hidden'}>
          <BrowserWindowView id={id} />
        </div>
      </Col>
    </Row>
  );
}

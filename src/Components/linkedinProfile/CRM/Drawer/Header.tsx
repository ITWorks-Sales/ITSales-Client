import { Avatar, Col, Row, Typography } from 'antd';
import React from 'react';
import { useRecoilValue } from 'recoil';
import userInfoDrawerState from '../atoms/userInfoDrawerState';

const { Title } = Typography;

export default function Header() {
  const liUser = useRecoilValue(userInfoDrawerState);

  const {
    avatar_url,
    avatar_id,
    full_name,
    headline,
    current_company_position,
    current_company_name,
  } = liUser;

  return (
    <>
      <Row align="middle" justify="space-around">
        <Col span={5}>
          <Avatar src={avatar_url} size={200} alt={avatar_id} />
        </Col>
        <Col span={16}>
          <Row>
            <Title level={2}>{full_name}</Title>
          </Row>
          <Row>
            <Title level={5}>
              {current_company_position} at {current_company_name}
            </Title>
          </Row>
          <Row>
            <Title level={3}>{headline}</Title>
          </Row>
        </Col>
      </Row>
    </>
  );
}

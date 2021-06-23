import { Table } from 'antd';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { ILIUser } from '../../../../api/types';
import UserState from './UserState';
import userState from '../atoms/userState';
import VisitProfileAction from './VisitProfileAction';
import TagsSelector from './TagsSelector';
import UsersName from './UserName';
import CRMUploadUsersLoadingState from '../atoms/CRMUploadUsersLoadingState';

const columns = [
  {
    title: 'Name',
    key: 'name',
    render: (data: ILIUser) => {
      const { id, full_name } = data;
      return <UsersName id={id} name={full_name} />;
    },
  },
  {
    title: 'Position',
    dataIndex: 'current_company_position',
    key: 'position',
  },
  {
    title: 'Tags',
    key: 'tags',
    render: (data: ILIUser) => {
      const { tags, id } = data;
      return <TagsSelector key={data.id} serverTags={tags} userId={id} />;
    },
  },
  {
    title: 'State',
    key: 'state',
    render: (data: ILIUser) => {
      const { state, id } = data;
      return <UserState state={state} id={id} />;
    },
  },
  {
    title: 'Action',
    key: 'action',
    render: (data: ILIUser) => {
      return <VisitProfileAction user={data} />;
    },
  },
];

export default function Users() {
  const userStateData = useRecoilValue(userState);
  const isLoading = useRecoilValue(CRMUploadUsersLoadingState);
  return (
    // <Spin spinning={isLoading} tip="loading">
    <Table
      dataSource={userStateData}
      pagination={false}
      columns={columns}
      style={{ marginTop: 25, marginRight: 25 }}
      bordered={true}
      loading={isLoading}
      scroll={{ y: '60vh' }}
    />
    // </Spin>
  );
}

import { Table, Form, Button, Divider } from 'antd';
import { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { ILIProfile } from '../../api/types';
import * as _ from 'lodash';
import { Tooltip } from '@material-ui/core';
import { PlusOutlined, SyncOutlined } from '@ant-design/icons';
import EditableCell from '../Tables/EditableCell';
import isEditing from '../Tables/isEditing';
import editRender from './LIProfileList/Actions';
import {
  getLinkedinProfiles,
  updateLinkedinProfile,
  deleteLinkedinProfile,
} from '../../api/linkedinProfile';
import profileRender from './LIProfileList/profileRender';
import AddLIProfile from './LIProfileList/AddLIProfileForm';
import assignedProxyRender from './LIProfileList/assignedProxyRender';

type Item = Omit<ILIProfile, 'user'> & { key: number };

let originalData: Item[] = [];

export default function LinkedinProfileList() {
  const deleteMutation = useMutation(deleteLinkedinProfile);
  const updateMutation = useMutation(updateLinkedinProfile);
  const queryClient = useQueryClient();
  const {
    isLoading,
    data: requestData,
  }: {
    isLoading: boolean;
    data: AxiosResponse<ILIProfile[]> | undefined;
  } = useQuery('LIProfile', getLinkedinProfiles, {
    onSuccess: (data) => {
      const profiles = data?.data;
      if (!profiles) return;
      originalData = [];
      for (const {
        id,
        email,
        password,
        name,
        linkedin_image,
        active,
        proxy,
      } of profiles) {
        const createdObj: Item = {
          key: id,
          id,
          email,
          password,
          name,
          linkedin_image,
          active,
          proxy,
        };
        !originalData.find((x: any) => x.id === createdObj.id)
          ? originalData.push(createdObj)
          : '';
      }
      originalData.sort((a, b) => a.id - b.id);
      setData(originalData);
    },
    refetchOnWindowFocus: false,
  });

  const [selectedRowKeys, setSelectedRowKeys]: any = useState([]);

  const [form] = Form.useForm();
  const [data, setData] = useState(originalData);
  const [editingKey, setEditingKey] = useState(0);
  const [addLIProfile, setAddLIProfile] = useState(false);

  if (isLoading) return <span>Loading...</span>;

  if (requestData == undefined)
    return <span>Error, no profiles could be loaded</span>;

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '20px',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      editable: true,
    },

    {
      title: 'Password',
      dataIndex: 'password',
      editable: true,
    },
    {
      title: 'Profile',
      dataIndex: 'profile',

      render: (_: any, record: any) => profileRender(record),
    },
    {
      title: 'Proxy',
      dataIndex: 'proxy',
      width: '200px',
      render: (_: any, record: any) =>
        assignedProxyRender(record, requestData.data),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_: any, record: any) =>
        editRender(record, editingKey, { save, cancel, edit }),
    },
  ];

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ ip: '', email: '', password: '', ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey(0);
  };

  const save = async (key: number) => {
    try {
      const row = (await form.validateFields()) as Item;
      const { email, password } = row;
      updateMutation.mutate(
        { id: key, email, password },
        {
          onSuccess: () => {
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
              const item = newData[index];
              newData.splice(index, 1, {
                ...item,
                ...row,
              });
              setData(newData);
              setEditingKey(0);
            } else {
              newData.push(row);
              setData(newData);
              setEditingKey(0);
            }
          },
        }
      );
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const deleteSelected = () => {
    if (selectedRowKeys.length === 0) return;
    deleteMutation.mutate(selectedRowKeys, {
      onSuccess: async (response) => {
        const selectedValues = response.data.map((id: number) =>
          data.find((LIProfile) => LIProfile.id === id)
        );
        setData(_.difference(data, selectedValues, _.isEqual));
        await queryClient.refetchQueries('LIProfile');
      },
    });
  };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record, editingKey),
      }),
    };
  });

  const onSelectChange = (selectedKeys: any) => {
    console.log('selectedRowKeys changed: ', selectedKeys);
    setSelectedRowKeys(selectedKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [Table.SELECTION_ALL, Table.SELECTION_NONE],
  };

  return (
    <Form form={form} component={false}>
      <Form.Item>
        <Button onClick={() => deleteSelected()}>Delete Selected</Button>
        <Divider type="vertical" />
        <Tooltip title="update">
          <Button
            shape="circle"
            icon={<SyncOutlined />}
            onClick={() => {
              queryClient.refetchQueries('LIProfile');
            }}
          />
        </Tooltip>
        <Divider type="vertical" />
        <Tooltip title="add">
          <Button
            shape="circle"
            icon={<PlusOutlined />}
            onClick={() => {
              setAddLIProfile(true);
            }}
          />
        </Tooltip>
      </Form.Item>

      <Table
        rowSelection={rowSelection}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
      <AddLIProfile setState={setAddLIProfile} state={addLIProfile} />
    </Form>
  );
}

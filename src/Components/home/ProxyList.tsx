import { Table, Form, Button, Divider } from 'antd';
import { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { IProxy } from '../../api/types';
import * as _ from 'lodash';
import { getProxies, deleteProxies, updateProxy } from '../../api/proxy';
import { Tooltip } from '@material-ui/core';
import { PlusOutlined, SyncOutlined } from '@ant-design/icons';
import EditableCell from '../Tables/EditableCell';
import isEditing from '../Tables/isEditing';
import editRender from './ProxyList/Actions';
import AddProxyForm from './ProxyList/AddProxyForm';
import assignedProfileRender from './ProxyList/assignedProfileRender';

interface Item {
  key: number;
  id: number;
  ip: string;
  login: string;
  password: string;
}

let originalData: Item[] = [];

export default function ProxyList() {
  const deleteMutation = useMutation(deleteProxies);
  const updateMutation = useMutation(updateProxy);
  const queryClient = useQueryClient();
  const {
    isLoading,
    data: requestData,
  }: {
    isLoading: boolean;
    data: AxiosResponse<IProxy[]> | undefined;
  } = useQuery('proxy', getProxies, {
    onSuccess: (data) => {
      const profiles = data?.data;
      if (!profiles) return;
      originalData = [];
      for (const { id, ip, login, password } of profiles) {
        const createdObj: Item = {
          key: id,
          id: id,
          ip: ip,
          login: login,
          password: password,
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
  const [addProxy, setAddProxy] = useState(false);

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
      title: 'IP',
      dataIndex: 'ip',
      editable: true,
    },
    {
      title: 'Login',
      dataIndex: 'login',
      editable: true,
    },
    {
      title: 'Password',
      dataIndex: 'password',
      editable: true,
    },
    {
      title: 'Linkedin Profile',
      dataIndex: 'profile',
      render: (_: any, record: any) => assignedProfileRender(record),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_: any, record: any) =>
        editRender(record, editingKey, { save, cancel, edit }),
    },
  ];

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ ip: '', login: '', password: '', ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey(0);
  };

  const save = async (key: number) => {
    try {
      const row = (await form.validateFields()) as Item;
      const { ip, login, password } = row;
      updateMutation.mutate(
        { id: key, ip, login, password },
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
          data.find((proxy) => proxy.id === id)
        );
        setData(_.difference(data, selectedValues, _.isEqual));
        await queryClient.refetchQueries('proxy');
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
            onClick={async () => {
              await queryClient.refetchQueries('proxy');
            }}
          />
        </Tooltip>
        <Divider type="vertical" />
        <Tooltip title="add">
          <Button
            shape="circle"
            icon={<PlusOutlined />}
            onClick={() => {
              setAddProxy(true);
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
      <AddProxyForm setState={setAddProxy} state={addProxy} />
    </Form>
  );
}

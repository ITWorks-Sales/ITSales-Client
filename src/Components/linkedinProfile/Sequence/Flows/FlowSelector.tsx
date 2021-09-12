import React, { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import selectedFlowId from '../atoms/selectedFlowId';
import linkedinProfileIdState from '../../atoms/linkeidnProfileIdState';
import { Select, Divider, Input, Row, PageHeader, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { createFlow, getAllFlows } from '../../../../api/flows';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { CreateFlowDTO } from '../../../../api/flows/dto/create-flow.dto';

const { Option } = Select;

export default function FlowSelector() {
  const setSelectedFlowId = useSetRecoilState(selectedFlowId);
  const profileId = useRecoilValue(linkedinProfileIdState);
  const [flowName, setFlowName] = useState('');
  const queryClient = useQueryClient();
  const { data: requestData } = useQuery('flows', () => getAllFlows());
  const mutation = useMutation(
    (createFlowDto: CreateFlowDTO) => createFlow(createFlowDto),
    {
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries('flows');
      },
    }
  );

  if (!requestData) return <div>No connection with the server</div>;

  const flows = requestData.data;

  const onSelect = (id: number | undefined) => {
    if (!id) return;
    setSelectedFlowId(id);
  };

  const addItem = () => {
    if (!flowName) {
      message.error(`New flow name field mustn't be empty`);
      return;
    }

    mutation.mutate({ title: flowName, profileId });
  };

  const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFlowName(e.target.value);
  };

  return (
    <>
      <PageHeader
        className="sidebar-color"
        title="Flows"
        subTitle="Select a Flow to view / edit it"
      />
      <br />
      <Row justify="center">
        <Select
          defaultValue={undefined}
          style={{ width: 300 }}
          placeholder="Select Flow"
          dropdownRender={(menu) => (
            <div>
              {menu}
              <Divider style={{ margin: '4px 0' }} />
              <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                <Input
                  style={{ flex: 'auto' }}
                  value={flowName}
                  onChange={onInputValueChange}
                />
                <a
                  style={{
                    flex: 'none',
                    padding: '8px',
                    display: 'block',
                    cursor: 'pointer',
                  }}
                  onClick={addItem}
                >
                  <PlusOutlined /> Add item
                </a>
              </div>
            </div>
          )}
          onSelect={onSelect}
        >
          {flows.map((flow) => (
            <Option value={flow.id} key={flow.id}>
              {flow.title}
            </Option>
          ))}
        </Select>
      </Row>
    </>
  );
}

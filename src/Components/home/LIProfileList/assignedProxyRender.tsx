import React from 'react';
import { Select } from 'antd';
import { ILIProfile, IProxy } from '../../../api/types';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getProxies } from '../../../api/proxy';
import { Option } from 'antd/lib/mentions';
import { AxiosResponse } from 'axios';
import { updateLinkedinProfile } from '../../../api/linkedinProfile';

export default function assignedProxyRender(
  record: any,
  profiles: ILIProfile[]
) {
  const { proxy, id } = record;

  const queryClient = useQueryClient();

  let proxyList: IProxy[] = [];

  const {
    isLoading,
    data: requestData,
  }: {
    isLoading: boolean;
    data: AxiosResponse<IProxy[]> | undefined;
  } = useQuery('proxy', getProxies, {});
  const updateProxy = useMutation(updateLinkedinProfile, {
    onSuccess: async () => {
      await queryClient.refetchQueries('LIProfile');
    },
  });

  if (requestData) proxyList = requestData.data;
  const handleChange = (values: any) => {
    if (values.key === 'none') {
      updateProxy.mutate({ id, proxyId: null });
      return;
    }
    const selectedProxy = proxyList.find((x) => x.ip === values.key);
    updateProxy.mutate({ id, proxyId: selectedProxy?.id });
  };
  return (
    <>
      <Select
        labelInValue
        //@ts-ignore
        defaultValue={{ value: proxy ? proxy.ip : 'none' }}
        style={{ width: 190 }}
        onChange={handleChange}
        loading={isLoading}
        disabled={isLoading}
      >
        <Option key="none" value="none">
          None
        </Option>
        {proxyList
          .filter(({ id }) => !isAssignedToAnotherProfile(id, record, profiles))
          .map(({ ip, id }) => {
            return (
              <Option key={id.toString()} value={ip}>
                {ip}
              </Option>
            );
          })}
      </Select>
    </>
  );
}

const isAssignedToAnotherProfile = (
  proxyId: number,
  currentProfile: ILIProfile,
  LIProfiles: ILIProfile[]
) => {
  if (currentProfile.proxy)
    if (currentProfile.proxy.id === proxyId) return false;
  for (const LIProfile of LIProfiles) {
    if (LIProfile.proxy)
      if (LIProfile.proxy.id === proxyId) {
        return true;
      }
  }
  return false;
};

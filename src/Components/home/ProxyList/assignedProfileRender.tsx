import React from 'react';
import { Typography } from 'antd';
import { ILIProfile } from '../../../api/types';
import { useQuery } from 'react-query';
import { AxiosResponse } from 'axios';
import { getLinkedinProfiles } from '../../../api/linkedinProfile';

export default function assignedProfileRender(record: any) {
  const {
    isLoading,
    data: requestData,
  }: {
    isLoading: boolean;
    data: AxiosResponse<ILIProfile[]> | undefined;
  } = useQuery('LIProfile', getLinkedinProfiles);

  if (isLoading) return <Typography>Loading</Typography>;

  const { data: LIProfiles } = requestData as AxiosResponse<ILIProfile[]>;
  let parentProfile: ILIProfile | undefined = undefined;

  for (const LIProfile of LIProfiles) {
    if (LIProfile.proxy)
      if (LIProfile.proxy.id === record.id) {
        parentProfile = LIProfile;
        break;
      }
  }

  return (
    <Typography>{parentProfile ? parentProfile.email : 'None'}</Typography>
  );
}

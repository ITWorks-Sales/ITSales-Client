import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import * as Papa from 'papaparse';
import React from 'react';
import { useQueryClient } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import { createFromLIHelper } from '../../../api/linkedinUser';
import linkeidnProfileIdState from '../atoms/linkeidnProfileIdState';
import CRMUploadUsersLoadingState from './atoms/CRMUploadUsersLoadingState';

export default function UploadUsers() {
  const [isLoading, setIsLoading] = useRecoilState(CRMUploadUsersLoadingState);
  const linkedinProfileId = useRecoilValue(linkeidnProfileIdState);
  const queryClient = useQueryClient();
  const parse = (csvFile: string | ArrayBuffer | null) => {
    Papa.parse(csvFile, {
      complete: async (result: any) => {
        if (result.errors.length >= 1) {
          console.log(result.errors);
          message.error('File was parsed with errors!');
        }
        message.success(`File was successfully loaded`);
        message.info(`Uploading started!`);
        console.log(result);
        try {
          setIsLoading(true);
          await createFromLIHelper({
            liHelperData: result.data,
            profileId: linkedinProfileId,
          });
        } catch (err) {
          console.log(err);
          message.error(`Error occured during download.`);
          setIsLoading(false);
          return;
        }
        setIsLoading(false);
        message.success(`File was successfully uploaded to the server`);
        queryClient.invalidateQueries('linkedinUsers');
      },
      header: true,
    });
  };

  return (
    <Upload
      accept=".csv"
      showUploadList={false}
      maxCount={1}
      beforeUpload={(file) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          if (e.target) {
            const csvFile = e.target.result;
            parse(csvFile);
          }
        };
        reader.readAsText(file);
        // Prevent upload
        return false;
      }}
    >
      <Button icon={<UploadOutlined />} disabled={isLoading}>
        Click to Upload
      </Button>
    </Upload>
  );
}

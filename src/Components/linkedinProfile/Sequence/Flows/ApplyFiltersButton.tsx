import { Button } from 'antd';
import React from 'react';
import { useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
import { updateNodesUsers } from '../../../../api/flows';
import paginationNodeDetailsState from '../../atoms/paginationNodeDetailsState';
import CRMfiltersState from '../../CRM/atoms/CRMfiltersState';
import currentPageState from '../../CRM/atoms/currentPageState';
import pageSizeState from '../../CRM/atoms/pageSizeState';
import selectedFlowId from '../atoms/selectedFlowId';

export default function ApplyFiltersButton() {
  const flowId = useRecoilValue(selectedFlowId);
  const filters = useRecoilValue(CRMfiltersState);
  const nodeDetails = useRecoilValue(paginationNodeDetailsState);
  const currentPage = useRecoilValue(currentPageState);
  const pageSize = useRecoilValue(pageSizeState);
  const queryClient = useQueryClient();
  if (!nodeDetails) return <p>Contact Admin! Error</p>;
  return (
    <Button
      onClick={async () => {
        await updateNodesUsers({ filters, nodeDetails });
        queryClient.invalidateQueries(['flow', flowId]);
        queryClient.invalidateQueries([
          'linkedinUsers',
          currentPage,
          pageSize,
          filters,
          nodeDetails,
        ]);
      }}
    >
      Edit Users List using Filters
    </Button>
  );
}

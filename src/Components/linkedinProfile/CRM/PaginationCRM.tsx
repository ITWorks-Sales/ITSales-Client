import React from 'react';
import { Pagination } from 'antd';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import currentPageState from './atoms/currentPageState';
import pageSizeState from './atoms/pageSizeState';
import { getLinkedinUsersPaginated } from '../../../api/linkedinUser';
import { useQuery } from 'react-query';
import userState from './atoms/userState';
import CRMfiltersState from './atoms/CRMfiltersState';

export default function PaginationCRM() {
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const [pageSize, setPageSize] = useRecoilState(pageSizeState);
  const setUserState = useSetRecoilState(userState);
  const CRMFilters = useRecoilValue(CRMfiltersState);

  const { isLoading, data: requestData } = useQuery(
    ['linkedinUsers', currentPage, pageSize, CRMFilters],
    () =>
      getLinkedinUsersPaginated(
        { limit: pageSize, page: currentPage },
        CRMFilters
      ),
    {
      keepPreviousData: true,
      onSuccess: ({ data: { items } }) => {
        setUserState(items);
      },
    }
  );

  if (isLoading) return <span>loading</span>;
  if (!requestData) return <span>no data</span>;

  const {
    data: {
      meta: { totalItems },
    },
  } = requestData;

  const onChange = (page: number, size: number | undefined) => {
    //keeping first entry on the page
    if (size != pageSize) {
      const indexOfFirstElementOnList = currentPage * pageSize - pageSize + 1;
      if (!size) return setPageSize(10);
      setPageSize(size);
      setCurrentPage(Math.ceil(indexOfFirstElementOnList / size));
      return;
    }
    setCurrentPage(page);
    if (!size) return setPageSize(10);
    setPageSize(size);
  };

  return (
    <Pagination
      current={currentPage}
      pageSize={pageSize}
      onChange={onChange}
      total={totalItems}
    />
  );
}

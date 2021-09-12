import { Pagination } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { getTemplatesPaginated } from '../../../../api/templates';
import currentPageTemplates from '../atoms/currentPageTemplates';
import pageSizeTemplates from '../atoms/pageSizeTemplates';
import templatesFilters from '../atoms/templatesFilters';
import templatesState from '../atoms/templatesState';

export default function PaginationTemplates() {
  const [currentPage, setCurrentPage] = useRecoilState(currentPageTemplates);
  const [pageSize, setPageSize] = useRecoilState(pageSizeTemplates);
  const setUserState = useSetRecoilState(templatesState);
  const templatesFiltersState = useRecoilValue(templatesFilters);

  const { isLoading, data: requestData } = useQuery(
    ['templates', currentPage, pageSize, templatesFiltersState],
    () =>
      getTemplatesPaginated(
        { limit: pageSize, page: currentPage },
        templatesFiltersState
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

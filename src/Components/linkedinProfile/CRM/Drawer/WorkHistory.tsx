import { List } from 'antd';
import React from 'react';
import { ILIUser } from '../../../../api/types';
import WorkDetails from './WorkDetails';

type props = { liUser: ILIUser };

export default function WorkHistory({ liUser }: props) {
  let options: WorkDetailsProps[] = [];
  for (let i = 1; i <= 10; i++) {
    if (!liUser[`company_name_${i}`]) break;
    options.push({
      company_name: liUser[`company_name_${i}`],
      company_id: liUser[`company_id_${i}`],
      company_url: liUser[`company_url_${i}`],
      company_website: liUser[`company_website_${i}`],
      company_position: liUser[`company_position_${i}`],
      company_position_description: liUser[`company_position_description_${i}`],
      company_position_location: liUser[`company_position_location_${i}`],
      company_start_date: liUser[`company_start_date_${i}`],
      company_end_date: liUser[`company_end_date_${i}`],
    });
  }
  return (
    <>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={options}
        renderItem={(item) => <WorkDetails {...item} />}
      ></List>
    </>
  );
}

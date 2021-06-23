import { List } from 'antd';
import React from 'react';

export default function WorkDetails(props: WorkDetailsProps) {
  let title: JSX.Element;
  let description = `${props.company_position}`;

  if (props.company_position_location)
    description += ` at ${props.company_position_location}`;

  if (props.company_url)
    title = <a href={props.company_url}>{props.company_name}</a>;
  else title = <span>{props.company_name}</span>;

  if (props.company_website)
    title = (
      <>
        {title}/<a href={props.company_website}>{props.company_website}</a>
      </>
    );

  return (
    <List.Item
      extra={
        <span>
          {dateToString(props.company_start_date)} until{' '}
          {dateToString(props.company_end_date)}
        </span>
      }
    >
      <List.Item.Meta title={title} description={description} />
      {props.company_position_description}
    </List.Item>
  );
}

const months = [
  'Jan.',
  'Feb.',
  'Mar.',
  'Apr.',
  'May',
  'Jun.',
  'Jul.',
  'Aug.',
  'Sep.',
  'Oct.',
  'Nov.',
  'Dec.',
];

const monthToString = (month: number | undefined) => {
  if (!month) return '';
  return months[month - 1] + ' ';
};

const dateToString = (date: string) => {
  const parsed = date.split('.');
  if (!parsed[0]) return 'Now';
  return monthToString(parseInt(parsed[1])) + parsed[0];
};

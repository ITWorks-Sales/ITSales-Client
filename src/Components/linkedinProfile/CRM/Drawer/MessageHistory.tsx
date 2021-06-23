import { Avatar, Comment } from 'antd';
import React from 'react';
import { ILIUser, IMessageHistory } from '../../../../api/types';

type props = { messageHistory: IMessageHistory; liUser: ILIUser };

export default function MessageHistory({ liUser, messageHistory }: props) {
  const messages = messageHistory.messages;
  const { linkedin_profile: liProfile } = messageHistory;
  if (!messages) return <></>;
  messages?.map((message) => {
    let name = '';
    let avatar = '';

    if (message.is_user_message_author) {
      name = liUser.full_name;
      avatar = liUser.avatar_url;
    } else {
      name = liProfile.name;
      avatar = liProfile.linkedin_image;
    }
    return (
      <Comment
        author={<a>{name}</a>}
        avatar={<Avatar src={avatar} alt={name} />}
        content={<p>{message.message_content}</p>}
      />
    );
  });
  return <div></div>;
}

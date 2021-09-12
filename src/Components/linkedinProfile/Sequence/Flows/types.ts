import { InmailConfigType } from '../types';

type InmailNodeData = {
  id: number;
  output: {
    successUsersCount: number;
    failedUsersCount: number;
  };
  config: InmailConfigType;
};

type QueueNodeData = {
  incomingUsersCount: number;
  collectedUsersCount: number;
  id: number;
};

export { InmailNodeData, QueueNodeData };

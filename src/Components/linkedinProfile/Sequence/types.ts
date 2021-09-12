import { ILIUserState } from '../../../api/types';

type Action = 'Message' | 'Inmail' | '';

type InmailConfigType = {
  templateName?: string;
  message: string;
  title: string;
  state: ILIUserState;
  max_clickMessage: number;
  max_clickSend: number;
  max_insertMessage: number;
  max_insertTitle: number;
  max_nextProfile: number;
  min_clickMessage: number;
  min_clickSend: number;
  min_insertMessage: number;
  min_insertTitle: number;
  min_nextProfile: number;
};

export { Action, InmailConfigType };

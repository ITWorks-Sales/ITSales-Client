import { nodeType } from '../../types';

export type DeleteNodesDTO = {
  nodes: {
    type: nodeType;
    id: number;
  }[];
};

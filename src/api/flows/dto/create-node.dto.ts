import { nodeType } from '../../types';

export type CreateNodeDTO = {
  flowId: number;
  position_x: number;
  position_y: number;
  type: nodeType;
};

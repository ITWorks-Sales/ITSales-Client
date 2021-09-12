import { nodeDetails } from '../../types';
import { CRMFilters } from '../../types';

export type UpdateNodesUsersDTO = {
  filters: CRMFilters;
  nodeDetails: nodeDetails;
};

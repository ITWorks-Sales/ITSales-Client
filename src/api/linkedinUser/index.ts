import { CRMFilters, ILIUser, nodeDetails } from '../types';
import { AxiosResponse } from 'axios';
import axios from '../.';
import { LIHelperType } from './dto/create-lihelper.dto';
import {
  IPaginationMeta,
  IPaginationOptions,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { UpdateLIUserDTO } from './dto/update-liuser.dto';
import { UpdateTagLIUserDTO } from './dto/update-tag-liuser.dto';

export function getLinkedinUser(id: number): Promise<AxiosResponse<ILIUser>> {
  return axios.get<ILIUser>('/linkedin-user', { params: { id } });
}

export function getLinkedinUsersPaginated(
  options: IPaginationOptions,
  filters: CRMFilters,
  paginationNodeDetails?: nodeDetails
): Promise<AxiosResponse<Pagination<ILIUser, IPaginationMeta>>> {
  return axios.get<Pagination<ILIUser, IPaginationMeta>>(
    '/linkedin-user/paginated',
    { params: { options, filters, paginationNodeDetails } }
  );
}

export function createFromLIHelper({
  liHelperData,
  profileId,
}: {
  liHelperData: LIHelperType[];
  profileId: number;
}) {
  return axios.post<void>(
    `/linkedin-user/liHelper?linkedinProfileId=${profileId}`,
    { liHelperData }
  );
}

export function updateLinkedinUser(
  updateObject: UpdateLIUserDTO
): Promise<AxiosResponse<ILIUser>> {
  return axios.put<ILIUser>('/linkedin-user', updateObject);
}

export function updateTagLinkedinUser(
  updateObject: UpdateTagLIUserDTO
): Promise<AxiosResponse<ILIUser>> {
  return axios.put<ILIUser>('/linkedin-user/tag', updateObject);
}

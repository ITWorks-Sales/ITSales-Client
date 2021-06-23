import { ITag } from '../types';
import { AxiosResponse } from 'axios';
import axios from '../.';
import { CreateTagDTO } from './dto/create-tag.dto';
import { DeleteTagDTO } from './dto/delete-tag.dto';
import { UpdateTagDTO } from './dto/update-tag.dto';

export function getTags(
  type: 'all' | 'one',
  id?: number
): Promise<AxiosResponse<ITag | ITag[]>> | undefined {
  if (type === 'all')
    return axios.get<ITag[]>('/tags', { params: { type: 'all' } });
  if (type === 'one') {
    if (!id) throw new Error('No ID provided.');
    return axios.get<ITag>('/tags', { params: { type: 'one', id } });
  }
  return;
}

export function createTag(
  createTagDto: CreateTagDTO
): Promise<AxiosResponse<ITag>> {
  return axios.post<ITag>('/tags', createTagDto);
}

export function updateTag(
  updateTagDTO: UpdateTagDTO
): Promise<AxiosResponse<ITag>> {
  return axios.put<ITag>('/tags', updateTagDTO);
}

export async function deleteTag(
  deleteTagDto: DeleteTagDTO
): Promise<AxiosResponse> {
  return axios.delete('/tags', { data: deleteTagDto });
}

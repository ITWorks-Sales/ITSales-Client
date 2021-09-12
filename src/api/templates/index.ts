import { Template, templatesFilters } from '../types';
import { AxiosResponse } from 'axios';
import axios from '../.';
import {
  IPaginationMeta,
  IPaginationOptions,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { UpdateTemplateDTO } from './dto/update-template.dto';
import { CreateTemplateDTO } from './dto/create-template.dto';

export function getTemplate(id: number): Promise<AxiosResponse<Template>> {
  return axios.get<Template>('/templates', { params: { id } });
}

export function getTemplatesPaginated(
  options: IPaginationOptions,
  filters: templatesFilters
): Promise<AxiosResponse<Pagination<Template, IPaginationMeta>>> {
  return axios.get<Pagination<Template, IPaginationMeta>>(
    '/templates/paginated',
    { params: { options, filters } }
  );
}

export function createTemplate(createTemplateDto: CreateTemplateDTO) {
  return axios.post<Template>(`/templates`, createTemplateDto);
}

export function updateTemplate(
  updateTemplateDto: UpdateTemplateDTO
): Promise<AxiosResponse<Template>> {
  return axios.put<Template>(`/templates`, updateTemplateDto);
}

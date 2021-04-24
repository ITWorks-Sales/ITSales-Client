import { ILIProfile } from '../types';
import { AxiosResponse } from 'axios';
import axios from '../.';
import { UpdateLinkedinProfileDTO } from './dto/update-linkedin-profile.dto';
import { CreateLinkedinProfileDTO } from './dto/create-linkedin-profile.dto';
import { UpdateLinkedinProfileProxyDTO } from './dto/update-linkedin-profile-proxy.dto';
export function getLinkedinProfiles(): Promise<AxiosResponse<ILIProfile[]>> {
  return axios.get<ILIProfile[]>('/linkedin-profile');
}

export function createLinkedinProfile({
  email,
  password,
}: CreateLinkedinProfileDTO): Promise<AxiosResponse<ILIProfile>> {
  return axios.post<ILIProfile>('/linkedin-profile', { email, password });
}

export function updateLinkedinProfile({
  id,
  email,
  password,
  name,
  linkedin_image,
  active,
  proxyId,
}: UpdateLinkedinProfileDTO): Promise<AxiosResponse<ILIProfile>> {
  return axios.put<ILIProfile>('/linkedin-profile', {
    id,
    ...(email && { email }),
    ...(password && { password }),
    ...(name && { name }),
    ...(linkedin_image && { linkedin_image }),
    ...(active && { active }),
    ...((proxyId && { proxyId }) || (proxyId === null && { proxyId })),
  });
}

export function updateLinkedinProfileProxy({
  id,
  proxyId,
}: UpdateLinkedinProfileProxyDTO): Promise<AxiosResponse<ILIProfile>> {
  return axios.put<ILIProfile>('/linkedin-profile/proxy', { id, proxyId });
}

export async function deleteLinkedinProfile(
  ids: number[]
): Promise<AxiosResponse<number[]>> {
  return axios.delete<number[]>('/linkedin-profile', { data: { ids } });
}

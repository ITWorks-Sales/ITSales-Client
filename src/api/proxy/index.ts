import { IProxy } from '../types';
import { AxiosResponse } from 'axios';
import axios from '../.';
import { CreateProxyDTO } from './dto/create-proxy.dto';
import { UpdateProxyDTO } from './dto/update-proxy.dto';
import { getLinkedinProfiles, updateLinkedinProfile } from '../linkedinProfile';

export function getProxies(): Promise<AxiosResponse<IProxy[]>> {
  return axios.get<IProxy[]>('/proxy');
}

export function createProxy({
  ip,
  login,
  password,
}: CreateProxyDTO): Promise<AxiosResponse<IProxy>> {
  return axios.post<IProxy>('/proxy', { ip, login, password });
}

export function updateProxy({
  id,
  ip,
  login,
  password,
}: UpdateProxyDTO): Promise<AxiosResponse<IProxy>> {
  return axios.put<IProxy>('/proxy', {
    id,
    ...(ip && { ip }),
    ...(login && { login }),
    ...(password && { password }),
  });
}

export async function deleteProxies(
  ids: number[]
): Promise<AxiosResponse<number[]>> {
  const { data: LIProfiles } = await getLinkedinProfiles();
  for (const LIProfile of LIProfiles) {
    if (LIProfile.proxy)
      if (ids.includes(LIProfile.proxy.id)) {
        await updateLinkedinProfile({ id: LIProfile.id, proxyId: null });
      }
  }
  return axios.delete<number[]>('/proxy', { data: { ids } });
}

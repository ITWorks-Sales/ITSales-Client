import { IUser } from '../types/user';
import { AxiosResponse } from 'axios';
import axios from '../.';

export default function profile(): Promise<AxiosResponse<IUser>> {
  return axios.get<IUser>('/auth/profile');
}

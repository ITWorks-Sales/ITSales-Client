import axios from '../.';

export default function login(email: string, password: string) {
  return axios({
    method: 'post',
    url: '/auth/login',
    data: {
      email,
      password,
    },
  });
}

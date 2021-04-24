export interface IUser {
  id: number;
  email: string;
  name: string;
}

export interface IProxy {
  id: number;
  ip: string;
  login: string;
  password: string;
  user: IUser;
  linkedin_profile: ILIProfile;
}

export interface ILIProfile {
  id: number;
  user: IUser;
  email: string;
  password: string;
  name: string;
  linkedin_image: string;
  active: boolean;
  proxy: IProxy;
}

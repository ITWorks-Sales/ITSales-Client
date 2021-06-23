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

export interface IMessageHistory {
  id: number;
  linkedin_user?: ILIUser;
  linkedin_profile: ILIProfile;
  messages?: IMessage[];
}

export interface IMessage {
  id: number;
  message_history?: IMessageHistory;
  is_user_message_author: boolean;
  message_content: string;
  time: string;
  attachments: string[];
}

export interface ITag {
  id: number;
  content: string;
  color: string;
}

export type ILIUserState =
  | 'No Action'
  | 'Initial Message'
  | 'Follow Up'
  | 'Meeting Scheduled'
  | 'Search Started by HR'
  | 'Provided Candidates'
  | 'Deal Finished';

export type updateTagLIUserType = 'add' | 'remove';

export type CRMFilters = {
  contactDateFilter: string[];
  premiumProfileFilter: boolean;
  openProfileFilter: boolean;
  userStateFilter: ILIUserState[];
  tagsFilter: number[];
};

export interface ILIUser {
  id: number;
  user?: IUser;
  linkedin_profiles?: ILIProfile[];
  state: ILIUserState;
  notes: string;
  full_name: string;
  first_name: string;
  last_name: string;
  profile_url: string;
  avatar_url: string;
  public_id: string;
  hash_id: string;
  member_id: number;
  avatar_id: string;
  headline: string;
  location: string;
  industry: string;
  summary: string;
  birthday: string;
  open_profile: boolean;
  email: string;
  phone_number: string;
  connected_at: string;
  tags: ITag[];
  message_histories: IMessageHistory[];
  current_company_name: string;
  current_company_position: string;
  company_name_1: string;
  company_id_1: string;
  company_url_1: string;
  company_website_1: string;
  company_position_1: string;
  company_position_description_1: string;
  company_position_location_1: string;
  company_start_date_1: string;
  company_end_date_1: string;
  company_name_2: string;
  company_id_2: string;
  company_url_2: string;
  company_website_2: string;
  company_position_2: string;
  company_position_description_2: string;
  company_position_location_2: string;
  company_start_date_2: string;
  company_end_date_2: string;
  company_name_3: string;
  company_id_3: string;
  company_url_3: string;
  company_website_3: string;
  company_position_3: string;
  company_position_description_3: string;
  company_position_location_3: string;
  company_start_date_3: string;
  company_end_date_3: string;
  company_name_4: string;
  company_id_4: string;
  company_url_4: string;
  company_website_4: string;
  company_position_4: string;
  company_position_description_4: string;
  company_position_location_4: string;
  company_start_date_4: string;
  company_end_date_4: string;
  company_name_5: string;
  company_id_5: string;
  company_url_5: string;
  company_website_5: string;
  company_position_5: string;
  company_position_description_5: string;
  company_position_location_5: string;
  company_start_date_5: string;
  company_end_date_5: string;
  company_name_6: string;
  company_id_6: string;
  company_url_6: string;
  company_website_6: string;
  company_position_6: string;
  company_position_description_6: string;
  company_position_location_6: string;
  company_start_date_6: string;
  company_end_date_6: string;
  company_name_7: string;
  company_id_7: string;
  company_url_7: string;
  company_website_7: string;
  company_position_7: string;
  company_position_description_7: string;
  company_position_location_7: string;
  company_start_date_7: string;
  company_end_date_7: string;
  company_name_8: string;
  company_id_8: string;
  company_url_8: string;
  company_website_8: string;
  company_position_8: string;
  company_position_description_8: string;
  company_position_location_8: string;
  company_start_date_8: string;
  company_end_date_8: string;
  company_name_9: string;
  company_id_9: string;
  company_url_9: string;
  company_website_9: string;
  company_position_9: string;
  company_position_description_9: string;
  company_position_location_9: string;
  company_start_date_9: string;
  company_end_date_9: string;
  company_name_10: string;
  company_id_10: string;
  company_url_10: string;
  company_website_10: string;
  company_position_10: string;
  company_position_description_10: string;
  company_position_location_10: string;
  company_start_date_10: string;
  company_end_date_10: string;
  [key: string]: string;
}

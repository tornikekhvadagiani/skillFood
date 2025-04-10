export interface UserData {
  email: string;
  firstname: string;
  lastname?: string;
  password: string;
  personalId: string;
  phone: string;
  profilepicture?: File | string;
  vehicle?: string;
  dates?: Record<string, string[]>;
  lng?: string;
  lat?: string;
  uuid?: string;
  calledCouriers?: any;
  userCalled?: string[];
  isAviable?: boolean;
}
export interface IUserApiDefaultInfo {
  _created: number;
  _data_type: string;
  _is_deleted: boolean;
  _modified: number;
  _self_link: string;
  _user: string;
  _uuid: string;
}

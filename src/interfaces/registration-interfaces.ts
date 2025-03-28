export interface ICreateUsersData {
  email: string;
  firstname: string;
  lastname: string | null;
  lat: number;
  lng: number;
  password: string;
  personalId: string;
  phone: string;
  profilepicture: string | null;
  role: string;
}

export interface ICreateCouriers {
  email: string;
  firstname: string;
  lastname: string | null;
  dates: any;
  password: string;
  personalId: string;
  phone: string;
  profilepicture: string | null;
  role: string;
}
export interface ICreateAdminData {
  email: string;
  firstname: string;
  lastname: string | null;
  password: string;
  personalId: string;
  phone: string;
  profilepicture: string | null;
  role: string;
}

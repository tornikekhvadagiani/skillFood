export interface UserData {
  email: string;
  firstname: string;
  lastname?: string;
  password: string;
  personalId: string;
  phone: string;
  profilepicture?: File | null;
  vehicle?: string;
  dates?: Record<string, string[]>;
  lng?: string;
  lat?: string;
}

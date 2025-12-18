export interface LoginResponse {
  token?: string;
}
export interface LoginResult extends LoginResponse {
  status: number;
  error?: string;
}
export interface RegisterResponse {
  id?: number;
  email: string;
}
export interface RegisterResult extends RegisterResponse {
  status: number;
  error?: string;
}

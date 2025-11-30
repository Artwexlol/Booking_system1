// src/api/auth.ts
import http from "./http";
import type { User } from "../types";

export interface AuthResponse {
  token: string;
  user: User;
}

export async function login(email: string, password: string) {
  const res = await http.post<AuthResponse>("/auth/login", { email, password });
  return res.data;
}

export async function register(name: string, email: string, password: string) {
  const res = await http.post<AuthResponse>("/auth/register", {
    name,
    email,
    password,
  });
  return res.data;
}

const authApi = { login, register };
export default authApi;

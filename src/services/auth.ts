import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from "@/lib/constants";
import { apiClient, AxiosError } from "./api";
import { getStoredToken } from "@/lib/auth";

interface LoginResponse {
  token: string;
  user: any;
}

interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export const login = async (
  email: string,
  password: string,
): Promise<APIResponse<{ user: any }>> => {
  try {
    const { data } = await apiClient.post<LoginResponse>("/auth/login", {
      email,
      password,
    });

    const { token, user } = data;
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    return { success: true, data: { user } };
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    console.error("Login error:", error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || "Error during login",
    };
  }
};

export const register = async (
  username: string,
  email: string,
  password: string,
): Promise<APIResponse> => {
  try {
    const { data } = await apiClient.post("/auth/register", {
      username,
      email,
      password,
    });

    return { success: true, data: data };
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return {
      success: false,
      error: error.response?.data?.message || "Error during registration",
    };
  }
};

export const logout = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
  delete apiClient.defaults.headers.common["Authorization"];
};

// Initialize auth header if token exists
const token = getStoredToken();
if (token) {
  // console.log("Found existing token, setting authorization header");
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

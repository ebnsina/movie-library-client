import type { Movie } from "@/types";
import { apiClient, AxiosError } from "./api";

interface MovieInput {
  name: string;
  releaseDate: string;
  duration: string;
  actors: string;
}

interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface GetMoviesParams {
  search?: string;
  page?: number;
  limit?: number;
}

export interface Paginated<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export const getMovies = async (
  params: GetMoviesParams = {},
): Promise<APIResponse<Paginated<Movie>>> => {
  try {
    const { data } = await apiClient.get("/movies", { params });
    return { success: true, data };
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};

// GET single movie
export const getMovie = async (id: string): Promise<APIResponse<Movie>> => {
  try {
    const { data } = await apiClient.get<Movie>(`/movies/${id}`);
    return { success: true, data };
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};

// CREATE movie
export const createMovie = async (
  movieData: MovieInput,
): Promise<APIResponse<Movie>> => {
  try {
    const response = await apiClient.post<Movie>("/movies", movieData);
    return { success: true, data: response.data };
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return {
      success: false,
      error: error.response?.data?.message || "Error creating movie",
    };
  }
};

// UPDATE movie
export const updateMovie = async (
  id: string,
  movieData: Partial<MovieInput>,
): Promise<APIResponse<Movie>> => {
  try {
    console.log("movieData", movieData);
    const response = await apiClient.put<Movie>(`/movies/${id}`, movieData);
    return { success: true, data: response.data };
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return {
      success: false,
      error: error.response?.data?.message || "Error updating movie",
    };
  }
};

// DELETE movie
export const deleteMovie = async (id: string): Promise<APIResponse<null>> => {
  try {
    await apiClient.delete(`/movies/${id}`);
    return { success: true };
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return {
      success: false,
      error: error.response?.data?.message || "Error deleting movie",
    };
  }
};

// RATE movie
export const rateMovie = async (
  id: string,
  rating: number,
  comment: string,
): Promise<APIResponse<any>> => {
  try {
    const response = await apiClient.post(`/movies/${id}/rate`, {
      rating,
      comment,
    });
    return { success: true, data: response.data };
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return {
      success: false,
      error: error.response?.data?.message || "Error rating movie",
    };
  }
};

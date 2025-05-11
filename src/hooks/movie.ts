∑import {
  createMovie,
  deleteMovie,
  getMovie,
  getMovies,
  rateMovie,
  updateMovie,
  type GetMoviesParams,
} from "@/services/movie";
import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export class MovieNotFoundError extends Error {}

export const movieKeys = {
  all: ["movies"] as const,
  lists: () => [...movieKeys.all, "list"] as const,
  list: (params: GetMoviesParams) => [...movieKeys.lists(), params] as const,
  details: () => [...movieKeys.all, "detail"] as const,
  detail: (id: string) => [...movieKeys.details(), id] as const,
};

export function useCreateMovie() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: movieKeys.lists() });
      toast.success("Movie added successfully.");
    },
    onError: () => {
      toast.error("Failed to add movie");
    },
  });
}

export function useUpdateMovie() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => {
      return updateMovie(id, data);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: movieKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: movieKeys.detail(variables.id),
      });
      toast.success("Movie updated successfully.");
    },
    onError: () => {
      toast.error("Failed to update movie");
    },
  });
}

export function useDeleteMovie() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteMovie(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: movieKeys.lists() });
      queryClient.invalidateQueries({ queryKey: movieKeys.detail(id) });
      toast.success("Movie deleted successfully.");
    },
    onError: () => {
      toast.error("Failed to delete movie");
    },
  });
}

export function useRateMovie() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      rating,
      comment,
    }: {
      id: string;
      rating: number;
      comment: string;
    }) => rateMovie(id, rating, comment),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: movieKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: movieKeys.detail(variables.id),
      });
      toast.success("Movie rated successfully.");
    },
    onError: () => {
      toast.error("Failed to rate movie");
    },
  });
}

export const moviesQueryOptions = (params: GetMoviesParams = {}) =>
  queryOptions({
    queryKey: movieKeys.list(params),
    queryFn: () => getMovies(params),
  });

export const movieQueryOptions = (movieId: string) =>
  queryOptions({
    queryKey: movieKeys.detail(movieId),
    queryFn: () => getMovie(movieId),
  });

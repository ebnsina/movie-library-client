import MovieForm from "@/components/movie/MovieForm";
import { MovieNotFoundError, movieQueryOptions } from "@/hooks/movie";
import {
  useQueryErrorResetBoundary,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  createFileRoute,
  ErrorComponent,
  useRouter,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_auth/movies/$id/edit")({
  loader: ({ context: { queryClient }, params: { id } }) => {
    return queryClient.ensureQueryData(movieQueryOptions(id));
  },
  errorComponent: MovieErrorComponent,
  component: RouteComponent,
});

export function MovieErrorComponent({ error }: ErrorComponentProps) {
  const router = useRouter();
  if (error instanceof MovieNotFoundError) {
    return <div>{error.message}</div>;
  }

  const queryErrorResetBoundary = useQueryErrorResetBoundary();

  useEffect(() => {
    queryErrorResetBoundary.reset();
  }, [queryErrorResetBoundary]);

  return (
    <div>
      <button
        onClick={() => {
          router.invalidate();
        }}
      >
        retry
      </button>
      <ErrorComponent error={error} />
    </div>
  );
}

function RouteComponent() {
  const movieId = Route.useParams().id;
  const { data: movie } = useSuspenseQuery(movieQueryOptions(movieId));

  return <MovieForm id={movieId} movie={movie.data} />;
}

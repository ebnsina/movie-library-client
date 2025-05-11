import MovieForm from "@/components/movie/MovieForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/movies/new")({
  component: RouteComponent,
});

function RouteComponent() {
  return <MovieForm />;
}

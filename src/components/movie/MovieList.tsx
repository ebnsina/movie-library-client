import type { Movie } from "@/types/movie";
import MovieCard from "./MovieCard";

export default function MovieList({ movies }: { movies: Movie[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
    </div>
  );
}

import MovieList from "@/components/movie/MovieList";
import SortButton from "@/components/movie/SortButton";
import sortMovies from "@/components/movie/SortMovies";
import { moviesQueryOptions } from "@/hooks/movie";
import useSocketUpdates from "@/hooks/useSocketUpdates";
import type { Movie } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import Cookies from "js-cookie";
import { useState } from "react";

const defaultParams = {
  search: "",
  page: 1,
  limit: 10,
};

export const Route = createFileRoute("/_auth/movies/")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(moviesQueryOptions(defaultParams)),
  component: RouteComponent,
});

function RouteComponent() {
  const [sortField, setSortField] = useState(
    Cookies.get("sortField") || "name",
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(
    (Cookies.get("sortOrder") as "asc" | "desc") || "asc",
  );

  useSocketUpdates();

  const moviesQuery = useSuspenseQuery(moviesQueryOptions(defaultParams));
  const moviesData: Movie[] = moviesQuery.data?.data?.data || [];

  const handleSort = (field: string) => {
    const newOrder: "asc" | "desc" =
      field === sortField && sortOrder === "asc" ? "desc" : "asc";

    setSortField(field);
    setSortOrder(newOrder);
    Cookies.set("sortField", field);
    Cookies.set("sortOrder", newOrder);
  };

  const sortedMovies = sortMovies(moviesData, sortField, sortOrder);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl lg:text-3xl font-bold text-gray-900 mb-4">
          Movies
        </h1>

        <div className="flex space-x-4">
          {["name", "releaseDate", "duration", "rating"].map((field) => (
            <SortButton
              key={field}
              field={field}
              currentSortField={sortField}
              currentSortOrder={sortOrder}
              onSort={handleSort}
            />
          ))}
        </div>
      </div>

      <MovieList movies={sortedMovies} />
    </div>
  );
}

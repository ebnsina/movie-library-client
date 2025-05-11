import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { moviesQueryOptions } from "@/hooks/movie";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { Movie } from "@/types";
import MovieList from "@/components/movie/MovieList";

const filtersSchema = z.object({
  query: z.string().optional(),
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().optional().default(1),
});

type ItemFilters = z.infer<typeof filtersSchema>;

export const Route = createFileRoute("/search")({
  validateSearch: zodValidator(filtersSchema),
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(moviesQueryOptions()),
  component: RouteComponent,
});

function RouteComponent() {
  const { query, page, limit } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const moviesQuery = useSuspenseQuery(
    moviesQueryOptions({ search: query, page, limit }),
  );

  const moviesData: Movie[] = moviesQuery.data?.data?.data || [];
  const total: number = moviesQuery.data?.data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  const updateFilters = <K extends keyof ItemFilters>(
    name: K,
    value: ItemFilters[K],
  ) => {
    navigate({
      search: (prev) => {
        const updated = { ...prev, [name]: value };

        if (typeof value === "string" && value.trim() === "") {
          delete updated[name];
        }

        return updated;
      },
    });
  };

  return (
    <div className="space-y-6">
      <Input
        type="search"
        placeholder="Search..."
        value={query ?? ""}
        onChange={(e) => updateFilters("query", e.target.value)}
      />

      <MovieList movies={moviesData} />

      <div className="flex items-center justify-between gap-4">
        {/* Prev / Next Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            disabled={page <= 1}
            onClick={() => updateFilters("page", page - 1)}
          >
            Prev
          </Button>
          <Button
            variant="outline"
            disabled={page >= totalPages}
            onClick={() => updateFilters("page", page + 1)}
          >
            Next
          </Button>
        </div>

        {/* Page Info */}
        <div>
          Page {page} of {totalPages}
        </div>

        {/* Rows per page */}
        <div className="flex items-center gap-2">
          <label htmlFor="limit">Rows:</label>
          <select
            id="limit"
            value={limit}
            onChange={(e) => updateFilters("limit", Number(e.target.value))}
            className="border rounded px-2 py-1"
          >
            {[5, 10, 20, 50].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

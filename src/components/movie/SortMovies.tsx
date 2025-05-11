import type { Movie } from "@/types/movie";

export default function sortMovies(
  movies: Movie[],
  sortField: string,
  sortOrder: "asc" | "desc"
) {
  return [...movies].sort((a, b) => {
    let comparison = 0;
    switch (sortField) {
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
      case "releaseDate":
        comparison =
          new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime();
        break;
      case "duration":
        comparison = a.duration - b.duration;
        break;
      case "rating":
        comparison = a.averageRating - b.averageRating;
        break;
      default:
        comparison = 0;
    }
    return sortOrder === "asc" ? comparison : -comparison;
  });
}

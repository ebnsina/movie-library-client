import { useDeleteMovie, useRateMovie } from "@/hooks/movie";
import { useAuth } from "@/store/AuthContext";
import type { Movie } from "@/types/movie";
import { StarIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { user } = useAuth();
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const deleteMovie = useDeleteMovie();
  const rateMovie = useRateMovie();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      deleteMovie.mutate(movie._id);
    }
  };

  const handleRate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    rateMovie.mutate({ id: movie._id, rating, comment });
  };

  const hasUserRated = movie.ratings?.some((r) => r.user === user?._id);

  return (
    <div className="border border-slate-200 rounded-xl p-4">
      <h3 className="text-base lg:text-xl font-bold mb-2">{movie.name}</h3>

      <div className="text-sm text-slate-600 space-y-2 mb-4">
        <p>Release Date: {new Date(movie.releaseDate).toLocaleDateString()}</p>
        <p>Duration: {movie.duration} minutes</p>
        <p>Actors: {movie.actors.join(", ")}</p>

        <div className="flex items-center mt-2 space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <HugeiconsIcon
              key={i}
              icon={StarIcon}
              size={15}
              strokeWidth={1.5}
              color={
                i < Math.round(movie.averageRating)
                  ? "#00C950"
                  : "text-slate-600"
              }
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">
            {movie.averageRating.toFixed(1)}/5
          </span>
        </div>
      </div>

      {user && (
        <div className="flex space-x-2 items-center">
          {movie.createdBy?._id === user._id && (
            <>
              <Button variant="default" size="sm">
                <Link to="/movies/$id/edit" params={{ id: movie._id }}>
                  Edit
                </Link>
              </Button>
              <Button variant="destructive" size="sm" onClick={handleDelete}>
                Delete
              </Button>
            </>
          )}

          {!hasUserRated && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowRating(!showRating)}
            >
              Rate
            </Button>
          )}
        </div>
      )}

      {showRating && (
        <form onSubmit={handleRate} className="mt-4 space-y-4">
          <div>
            <Label className="block mb-2 text-xs font-medium text-slate-600">
              Rating (1-5)
            </Label>
            <Input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              required
            />
          </div>
          <div>
            <Label className="block mb-2 text-xs font-medium text-slate-600">
              Comment
            </Label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              required
            />
          </div>

          <Button type="submit">Submit Rating</Button>
        </form>
      )}
    </div>
  );
}

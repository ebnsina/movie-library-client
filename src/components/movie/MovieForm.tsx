import { useAppForm } from "@/hooks/form";
import { useCreateMovie, useUpdateMovie } from "@/hooks/movie";
import {
  movieOutputSchema,
  type MovieFormData,
} from "@/lib/schemas/movieSchema";
import type { Movie } from "@/types/movie";
import { ArrowLeft01FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export default function MovieForm({
  id,
  movie,
}: {
  id?: string;
  movie?: Movie;
}) {
  const navigate = useNavigate();
  const createMovie = useCreateMovie();
  const updateMovie = useUpdateMovie();

  const isEditMode = Boolean(id);

  const form = useAppForm({
    defaultValues: {
      name: "",
      releaseDate: "",
      duration: "",
      actors: "",
    },
    validators: {
      onChange: movieOutputSchema,
    },
    onSubmit: async ({ value }: { value: MovieFormData }) => {
      const newMovie = {
        name: value.name,
        releaseDate: value.releaseDate.split("T")[0],
        duration: value.duration,
        actors: value.actors,
      };

      if (isEditMode && id) {
        updateMovie.mutate({ id, data: newMovie });
      } else {
        createMovie.mutate(newMovie);
      }

      navigate({ to: "/movies" });
    },
  });

  useEffect(() => {
    if (isEditMode && movie) {
      form.setFieldValue("name", movie.name ?? "");
      form.setFieldValue("releaseDate", movie.releaseDate?.split("T")[0] ?? "");
      form.setFieldValue(
        "duration",
        movie.duration ? String(movie.duration) : ""
      );
      form.setFieldValue(
        "actors",
        Array.isArray(movie.actors)
          ? movie.actors
              .map((a) => a.trim())
              .filter(Boolean)
              .join(", ")
          : ""
      );
    }
  }, [isEditMode, movie]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="max-w-md mx-auto space-y-4"
    >
      {isEditMode && (
        <div>
          <Link to="/movies">
            <HugeiconsIcon
              icon={ArrowLeft01FreeIcons}
              size={30}
              strokeWidth={1.5}
              className="text-green-500 hover:scale-105 transform transition-all"
            />
          </Link>
        </div>
      )}

      <h2 className="text-lg font-medium mb-4">
        {isEditMode ? "Edit Movie" : "Add New Movie"}
      </h2>

      <form.AppField
        name="name"
        children={(field) => <field.TextField label="Name" />}
      />
      <form.AppField
        name="releaseDate"
        children={(field) => (
          <field.TextField label="Release Date" type="date" />
        )}
      />
      <form.AppField
        name="duration"
        children={(field) => <field.TextField label="Duration" type="number" />}
      />
      <form.AppField
        name="actors"
        children={(field) => <field.TextField label="Actors" />}
      />

      <form.AppForm>
        <form.SubscribeButton label={isEditMode ? "Save Changes" : "Save"} />
      </form.AppForm>
    </form>
  );
}

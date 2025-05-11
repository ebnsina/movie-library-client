import { z } from "zod";

export const movieFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  releaseDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid release date",
  }),
  duration: z.string().refine(
    (val) => {
      const num = Number(val);
      return !isNaN(num) && num > 0;
    },
    {
      message: "Duration must be a positive number",
    }
  ),
  actors: z
    .string()
    .refine((val) => val.split(",").filter(Boolean).length > 0, {
      message: "At least one actor is required",
    }),
});

export const movieOutputSchema = movieFormSchema.transform((data) => ({
  name: data.name,
  releaseDate: data.releaseDate,
  duration: Number(data.duration),
  actors: data.actors
    .split(",")
    .map((actor) => actor.trim())
    .filter(Boolean),
}));

export type MovieFormData = z.infer<typeof movieFormSchema>;
export type MovieOutputData = z.infer<typeof movieOutputSchema>;

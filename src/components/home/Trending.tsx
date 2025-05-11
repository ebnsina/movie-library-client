import { motion } from "motion/react";
import { movies } from "@/data/movies";

export default function Trending() {
  return (
    <section className="px-6 py-10">
      <h3 className="text-2xl font-semibold mb-4">🔥 Trending Now</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <motion.div
            key={movie.id}
            whileHover={{ scale: 1.05 }}
            className="bg-slate-100 rounded-lg overflow-hidden"
          >
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-60 object-cover"
            />
            <div className="p-4">
              <h4 className="text-lg font-bold">{movie.title}</h4>
              <p className="text-sm text-gray-400">{movie.genre}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";

export default function Hero() {
  return (
    <section className="bg-cover bg-center bg-[url('https://wallpaperaccess.com/full/2004300.jpg')] h-[30vh] md:h-[50vh] lg:h-[70vh] flex items-center justify-center text-center px-4">
      <div className="">
        <h2 className="text-xl lg:text-4xl font-bold mb-4">
          Explore Your Next Favorite Movie
        </h2>
        <p className="text-xs lg:text-sm text-slate-600 mb-6">
          Browse through thousands of movies across genres, ratings & more.
        </p>

        <Button>
          <Link to="/movies">Start Watching</Link>
        </Button>
      </div>
    </section>
  );
}

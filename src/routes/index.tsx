import Hero from "@/components/home/Hero";
import Trending from "@/components/home/Trending";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Trending />
    </div>
  );
}

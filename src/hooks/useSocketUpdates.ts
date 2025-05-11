import { useEffect } from "react";
import { socket } from "@/lib/socket";
import { toast } from "sonner";
import { useAuth } from "@/store/AuthContext";

const useSocketUpdates = () => {
  const auth = useAuth();

  useEffect(() => {
    socket.on("movieCreated", (movie) => {
      if (movie.createdBy !== auth.user?._id) {
        toast.success(`New Movie Created: ${movie.name}`);
      }
    });

    socket.on("movieUpdated", (movie) => {
      if (movie.createdBy !== auth.user?._id) {
        toast.success(`Movie Updated: ${movie.name}`);
      }
    });

    socket.on("movieRated", (movie) => {
      if (movie.createdBy !== auth.user?._id) {
        toast.success(`Movie Rated: ${movie.name}`);
      }
    });

    return () => {
      socket.off("movieCreated");
      socket.off("movieUpdated");
      socket.off("movieRated");
    };
  }, [auth.user?._id]);

  return null;
};

export default useSocketUpdates;

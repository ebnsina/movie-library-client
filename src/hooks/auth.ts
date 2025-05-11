import { useAuth } from "@/store/AuthContext";
import { useNavigate, useRouter } from "@tanstack/react-router";

export function useLogout() {
  const auth = useAuth();
  const navigate = useNavigate();
  const router = useRouter();

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      try {
        await auth.logout();
        await router.invalidate();
        navigate({ to: "/" });
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
  };

  return handleLogout;
}

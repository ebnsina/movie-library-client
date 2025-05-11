import { useAuth } from "@/store/AuthContext";
import { Link } from "@tanstack/react-router";
import UserDropdown from "./UserDropdown";
import { HugeiconsIcon } from "@hugeicons/react";
import { SearchIcon } from "@hugeicons/core-free-icons";

export default function Nav() {
  const auth = useAuth();

  return (
    <nav className="space-x-4 text-sm hidden md:flex items-center">
      <Link to="/search">
        <HugeiconsIcon icon={SearchIcon} size={20} />
      </Link>

      {auth.user ? (
        <div className="flex space-x-2 items-center">
          <span className="text-slate-600 text-sm">
            Welcome, {auth?.user?.username || "Guest"}
          </span>
          <UserDropdown />
        </div>
      ) : (
        <>
          <Link to="/signin">Login</Link>
          <Link to="/signup">Register</Link>
        </>
      )}
    </nav>
  );
}

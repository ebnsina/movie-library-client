import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/hooks/auth";
import { Link } from "@tanstack/react-router";
import UserAvatar from "./UserAvatar";

export default function UserDropdown() {
  const handleLogout = useLogout();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link to="/movies">My Movies</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/movies/new">Add Movies</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button className="cursor-pointer" onClick={handleLogout}>
              Logout
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

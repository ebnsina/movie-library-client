import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/store/AuthContext";

export default function UserAvatar() {
  const { user } = useAuth();

  const initials = user?.username
    ? user.username.slice(0, 2).toUpperCase()
    : "US";

  return (
    <Avatar>
      <AvatarFallback className="text-black">{initials}</AvatarFallback>
    </Avatar>
  );
}

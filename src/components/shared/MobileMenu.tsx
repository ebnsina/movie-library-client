import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { MenuIcon } from "@hugeicons/core-free-icons";
import { Link } from "@tanstack/react-router";
import { useLogout } from "@/hooks/auth";
import { useAuth } from "@/store/AuthContext";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Movies", to: "/movies" },
  { label: "Add Movie", to: "/movies/new" },
];

export default function MobileMenu() {
  const auth = useAuth();
  const handleLogout = useLogout();

  return (
    <div className="block md:hidden">
      <Drawer>
        <DrawerTrigger>
          <HugeiconsIcon icon={MenuIcon} size={25} strokeWidth={1.5} />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle></DrawerTitle>
            <DrawerDescription>
              {auth?.user ? (
                <ul className="space-y-6">
                  {navLinks.map((link) => (
                    <li key={link.to}>
                      <Link to={link.to}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="space-y-2 text-center">
                  <p>Please login to add or rating movie</p>
                  <Link className="text-green-500" to="/signin">
                    Sign In
                  </Link>
                </div>
              )}

              {auth.user && (
                <div className="mt-6">
                  <Button onClick={handleLogout} className="btn btn-secondary">
                    Logout
                  </Button>
                </div>
              )}
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose>
              <Button className="w-full" variant="outline">
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

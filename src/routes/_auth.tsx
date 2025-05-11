import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/auth";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticate) {
      throw redirect({
        to: "/signin",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  const handleLogout = useLogout();

  return (
    <div className="space-y-4">
      <header className="lg:flex justify-between items-center bg-green-50 px-10 py-20 rounded-xl">
        <div className="space-y-2 text-green-900 mb-4 lg:mb-0">
          <h1 className="text-sm font-medium">Authenticated Route</h1>
          <p className="text-xs ">
            This route's content is only visible to authenticated users.
          </p>
        </div>

        <Button variant="outline" type="button" onClick={handleLogout}>
          Logout
        </Button>
      </header>

      <Outlet />
    </div>
  );
}

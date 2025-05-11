import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { Toaster } from "@/components/ui/sonner";
import type { AuthContextType } from "@/store/AuthContext";
import type { QueryClient } from "@tanstack/react-query";
import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

interface MyRouterContext {
  auth: AuthContextType;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <div className="flex flex-col justify-between min-h-screen">
        <Header />
        <div className="container mx-auto px-4 md:px-0 py-6">
          <Outlet />
        </div>
        <Footer />
      </div>

      <Toaster />
      <TanStackRouterDevtools />
    </>
  ),
  notFoundComponent: () => {
    return (
      <div>
        <p>This is the notFoundComponent configured on root route</p>
        <Link to="/">Start Over</Link>
      </div>
    );
  },
});

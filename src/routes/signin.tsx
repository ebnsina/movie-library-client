import { useAppForm } from "@/hooks/form";
import { FALLBACK_ROUTE } from "@/lib/constants";
import { redirectSchema, signInSchema } from "@/lib/schemas/userSchema";
import { useAuth } from "@/store/AuthContext";
import {
  createFileRoute,
  Link,
  redirect,
  useNavigate,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/signin")({
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticate) {
      throw redirect({ to: search.redirect || FALLBACK_ROUTE });
    }
  },
  validateSearch: redirectSchema,
  component: SignIn,
});

function SignIn() {
  const auth = useAuth();
  const isLoading = useRouterState({ select: (s) => s.isLoading });
  const navigate = useNavigate();
  const router = useRouter();
  const search = Route.useSearch();

  const form = useAppForm({
    defaultValues: {
      email: "test@test.com",
      password: "12341234",
    },
    validators: {
      onChange: signInSchema,
    },
    onSubmit: async ({ value }) => {
      const { email, password } = value;

      const result = await auth.login(email, password);
      if (result.success) {
        toast.success("Logged in successfully");
        await router.invalidate();
        await navigate({ to: search.redirect || FALLBACK_ROUTE });
      } else {
        console.log(result.error);
        toast.error(result.error);
      }
    },
  });

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h2 className="text-lg font-medium mb-4">Sign in to your account</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.AppField
          name="email"
          children={(field) => <field.TextField label="Email" />}
        />
        <form.AppField
          name="password"
          children={(field) => <field.TextField label="Password" />}
        />

        <div className="flex justify-between items-center mt-6">
          <Link className="text-sm text-slate-600 hover:underline" to="/signup">
            Sign Up
          </Link>

          <form.AppForm>
            <form.SubscribeButton
              label={isLoading ? "Signing in..." : "Sign In"}
            />
          </form.AppForm>
        </div>
      </form>
    </div>
  );
}

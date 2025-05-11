import { useAppForm } from "@/hooks/form";
import { signUpSchema } from "@/lib/schemas/userSchema";
import { useAuth } from "@/store/AuthContext";
import {
  createFileRoute,
  Link,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/signup")({
  component: SignUp,
});

function SignUp() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const isLoading = useRouterState({ select: (s) => s.isLoading });

  const form = useAppForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    validators: {
      onChange: signUpSchema,
    },
    onSubmit: async ({ value }) => {
      const { username, email, password } = value;

      const result = await register(username, email, password);
      if (result.success) {
        toast.success("Registered successfully");
        navigate({ to: "/signin" });
      } else {
        toast.error(result.error);
      }
    },
  });

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h2 className="text-lg font-medium mb-4">Create a new account</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.AppField
          name="username"
          children={(field) => <field.TextField label="Username" />}
        />
        <form.AppField
          name="email"
          children={(field) => <field.TextField label="Email" />}
        />
        <form.AppField
          name="password"
          children={(field) => <field.TextField label="Password" />}
        />

        <div className="flex justify-between items-center mt-6">
          <Link className="text-sm text-slate-600 hover:underline" to="/signin">
            Sign In
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

import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "../contexts/AuthContext";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const { login } = useAuth();

  return (
    <div>
      <h1>Welcome to Agera!</h1>
      <p>Login page</p>

      <button
        type="button"
        onClick={async () => {
          await login("johnny@doe.com", "johnny");
        }}
      >
        Log in
      </button>
    </div>
  );
}

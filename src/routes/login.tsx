import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "../contexts/AuthContext";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
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
        Sign up
      </button>
    </div>
  );
}

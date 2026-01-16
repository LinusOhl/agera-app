import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "../contexts/AuthContext";

export const Route = createFileRoute("/_authenticated/user")({
  component: Component,
});

function Component() {
  const { user } = useAuth();

  return (
    <div>
      <p>Hello {user?.firstName}</p>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "../../contexts/AuthContext";

export const Route = createFileRoute("/_authenticated/_authenticated/user")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuth();

  return (
    <div>
      <p>Hello {user?.firstName}</p>
    </div>
  );
}

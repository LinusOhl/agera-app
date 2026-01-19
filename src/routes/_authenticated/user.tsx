import { Button, Image } from "@mantine/core";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { signOut } from "../../lib/auth-client";

export const Route = createFileRoute("/_authenticated/user")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();

  return (
    <div>
      <p>User ID: {user.id}</p>

      <Image src={user.image} alt="Avatar" />

      <Button
        color="dark"
        onClick={() => signOut({}, { onSuccess: () => navigate({ to: "/" }) })}
      >
        Sign out
      </Button>
    </div>
  );
}

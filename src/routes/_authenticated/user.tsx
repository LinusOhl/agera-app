import { Button } from "@mantine/core";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export const Route = createFileRoute("/_authenticated/user")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      await logout();

      navigate({ to: "/" });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return (
    <div>
      <p>Hello {user?.firstName}</p>

      {error && <p>{error}</p>}

      <Button onClick={handleLogout}>Log out</Button>
    </div>
  );
}

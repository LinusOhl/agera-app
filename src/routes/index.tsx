import { Loader } from "@mantine/core";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useAuth } from "../contexts/AuthContext";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loader color="dark" />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Welcome to Agera!</h1>
      <p>Homepage</p>
      <p>{user.firstName}</p>
    </div>
  );
}

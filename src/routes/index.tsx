import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useAuth } from "../contexts/AuthContext";

export const Route = createFileRoute("/")({
  // beforeLoad: ({ context }) => {
  //   if (context) {
  //     console.log("context:", context);

  //     if (!context.user) {
  //       throw redirect({ to: "/login" });
  //     }
  //   }
  // },
  component: Home,
});

function Home() {
  const { accessToken } = useAuth();

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Welcome to Agera!</h1>
      <p>Homepage</p>
    </div>
  );
}

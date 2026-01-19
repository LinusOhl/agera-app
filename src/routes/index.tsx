import { Button, Card, Stack, Text, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { signIn, signOut, useSession } from "../lib/auth-client";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: session } = useSession();

  return (
    <Stack h={"100vh"} p={"xs"} gap={"xl"} justify="center">
      <Stack gap={0} align="center">
        <Text fz={"lg"} fw={500}>
          Welcome to
        </Text>
        <Title order={1} fz={96}>
          agera
        </Title>
      </Stack>

      <Card padding={"lg"} radius={"md"} shadow="md">
        <Stack gap={"md"}>
          {!session && (
            <Button
              variant="outline"
              color="dark"
              onClick={async () =>
                await signIn.social({
                  provider: "github",
                  callbackURL: "/user",
                })
              }
            >
              Sign in with GitHub
            </Button>
          )}

          {session && <Text>Client signed in as: {session.user.name}</Text>}
          {session && (
            <Button variant="filled" color="dark" onClick={() => signOut()}>
              Sign out
            </Button>
          )}
        </Stack>
      </Card>
    </Stack>
  );
}

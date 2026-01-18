import { Button, Card, Stack, Text, Title } from "@mantine/core";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

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
          <Button
            variant="outline"
            color="dark"
            onClick={() => navigate({ to: "/login" })}
          >
            Log in
          </Button>

          <Button color="dark" onClick={() => navigate({ to: "/signup" })}>
            Sign up
          </Button>
        </Stack>
      </Card>
    </Stack>
  );
}

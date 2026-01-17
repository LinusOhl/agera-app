import { Box, Button, Card, Center, Flex, Text, Title } from "@mantine/core";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  return (
    <Box>
      <Center maw={"100%"} h={"100vh"}>
        <Flex direction={"column"}>
          <Flex direction={"column"}>
            <Text fz={"lg"} fw={500}>
              Welcome to
            </Text>
            <Title order={1} mb={"xl"} fz={96}>
              agera
            </Title>
          </Flex>

          <Card padding={"lg"} radius={"md"} shadow="md">
            <Flex direction={"column"} gap={"md"}>
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
            </Flex>
          </Card>
        </Flex>
      </Center>
    </Box>
  );
}

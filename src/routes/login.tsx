import {
  Alert,
  Button,
  Card,
  Center,
  Flex,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import {
  createFileRoute,
  Link,
  linkOptions,
  useNavigate,
} from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const { login } = useAuth();

  const indexLinkOptions = linkOptions({
    to: "/",
  });

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email.trim()) {
      return;
    }

    if (!password.trim()) {
      return;
    }

    try {
      await login(email, password);

      navigate({ to: "/user" });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <Center maw={"100%"} h={"100vh"}>
      <Flex direction={"column"}>
        <Title order={1} mb={"xl"} fz={96} c={"dark"}>
          agera
        </Title>

        <Card padding={"lg"} radius={"md"} shadow="md" mb={"xl"}>
          <Text fz={"lg"} fw={500} mb={"lg"} c={"dark"}>
            Log in to manage your tasks
          </Text>

          <Stack gap={"md"}>
            {error && (
              <Alert variant="light" color="red">
                {error}
              </Alert>
            )}

            <TextInput
              label={"Email"}
              placeholder="john@email.com"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />

            <PasswordInput
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />

            <Button variant="outline" color="dark" onClick={handleLogin}>
              Log in
            </Button>
          </Stack>
        </Card>

        <Button
          variant="transparent"
          color="dark"
          size="compact-sm"
          leftSection={<IconArrowNarrowLeft color={theme.colors.dark[6]} />}
          style={{
            alignSelf: "flex-start",
          }}
          component={Link}
          {...indexLinkOptions}
        >
          Go back
        </Button>
      </Flex>
    </Center>
  );
}

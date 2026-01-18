import {
  Alert,
  Button,
  Card,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
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

  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: isNotEmpty(),
      password: isNotEmpty(),
    },
  });

  const handleLogin = async (values: typeof form.values) => {
    try {
      await login(values.email, values.password);

      navigate({ to: "/user" });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return (
    <Stack h={"100vh"} p={"xs"} gap={"xl"} justify="center">
      <Title
        order={1}
        fz={96}
        c={"dark"}
        styles={{ root: { textAlign: "center" } }}
      >
        agera
      </Title>

      <Card padding={"lg"} radius={"md"} shadow="md">
        <Text fz={"lg"} fw={500} mb={"lg"} c={"dark"}>
          Log in to manage your tasks
        </Text>

        <Stack gap={"md"}>
          {error && (
            <Alert variant="light" color="red">
              {error}
            </Alert>
          )}

          <form onSubmit={form.onSubmit(handleLogin)}>
            <TextInput
              key={form.key("email")}
              label="Email"
              mb={"md"}
              {...form.getInputProps("email")}
            />

            <PasswordInput
              key={form.key("password")}
              label="Password"
              mb={"md"}
              {...form.getInputProps("password")}
            />

            <Button type="submit" variant="outline" color="dark" fullWidth>
              Log in
            </Button>
          </form>
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
    </Stack>
  );
}

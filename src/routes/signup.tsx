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
import { hasLength, isEmail, useForm } from "@mantine/form";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import {
  createFileRoute,
  Link,
  linkOptions,
  useNavigate,
} from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const { signup } = useAuth();

  const indexLinkOptions = linkOptions({
    to: "/",
  });

  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      firstName: hasLength(
        { min: 2 },
        "First name must be at least 2 characters long.",
      ),
      lastName: hasLength(
        { min: 2 },
        "Last name must be at least 2 characters long.",
      ),
      email: isEmail("Invalid email format."),
      password: hasLength(
        { min: 8 },
        "Password must be at least 8 characters long.",
      ),
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords does not match." : null,
    },
  });

  const handleSignup = async (values: typeof form.values) => {
    try {
      await signup(values);

      navigate({ to: "/login" });
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
          Sign up to start creating tasks
        </Text>

        <Stack gap={"md"}>
          {error && (
            <Alert variant="light" color="red">
              {error}
            </Alert>
          )}

          <form onSubmit={form.onSubmit(handleSignup)}>
            <TextInput
              key={form.key("firstName")}
              label="First name"
              placeholder="John"
              mb={"md"}
              {...form.getInputProps("firstName")}
            />

            <TextInput
              key={form.key("lastName")}
              label="Last name"
              placeholder="Doe"
              mb={"md"}
              {...form.getInputProps("lastName")}
            />

            <TextInput
              key={form.key("email")}
              label="Email"
              placeholder="johndoe@email.com"
              mb={"md"}
              {...form.getInputProps("email")}
            />

            <PasswordInput
              key={form.key("password")}
              label="Password"
              mb={"md"}
              {...form.getInputProps("password")}
            />

            <PasswordInput
              key={form.key("confirmPassword")}
              label="Confirm password"
              mb={"md"}
              {...form.getInputProps("confirmPassword")}
            />

            <Button type="submit" variant="outline" color="dark" fullWidth>
              Sign up
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

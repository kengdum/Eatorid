import { useState } from "react";
import {
  Button,
  ActionIcon,
  Anchor,
  Container,
  Divider,
  TextInput,
  Flex,
  Text,
  Title,
  Stack,
  PasswordInput,
  Notification,
} from "@mantine/core";
import { isEmail, hasLength } from "@mantine/form";
import { useForm } from "@mantine/form";
import { IconX } from "@tabler/icons-react";
import { useUI } from "../contexts/UIContext";
import { useAuth } from "../contexts/AuthContext";

interface FormValues {
  email: string;
  password: string;
}

const SignInModal = () => {
  const { setShowModal } = useUI();
  const { signIn } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: isEmail("Invalid email"),
      password: hasLength({ min: 6 }, "Password must be at least 6 characters long"),
    },
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      setError("");

      const { email, password } = values;

      await signIn(email, password);
    } catch (err: any) {
      setError(err.response.data.error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container p={0}>
      <Container p={25}>
        <Flex align={"center"} justify={"space-between"}>
          <Title>Sign in</Title>
          <ActionIcon size="lg" onClick={() => setShowModal("null")}>
            <IconX size={"100%"} />
          </ActionIcon>
        </Flex>
      </Container>

      <Divider />

      <Container p={25}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput label="Email" {...form.getInputProps("email")} withAsterisk />
            <PasswordInput label="Password" {...form.getInputProps("password")} withAsterisk />

            {error !== "" && (
              <Notification icon={<IconX />} title="Sign in failed" color="red" withCloseButton={false}>
                {error}
              </Notification>
            )}

            <Button loading={loading} mt={30} type="submit">
              Sign up
            </Button>
          </Stack>
        </form>
      </Container>

      <Divider />

      <Container p={25}>
        <Text ta={"center"}>
          Don't have an account?{" "}
          <Anchor fw="700" component="button" type="button" onClick={() => setShowModal("signup")}>
            Sign up
          </Anchor>
        </Text>
      </Container>
    </Container>
  );
};

export default SignInModal;

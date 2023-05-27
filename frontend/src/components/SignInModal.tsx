import { useState } from "react";
import {
  Button,
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
  CloseButton,
  Alert,
} from "@mantine/core";
import { isEmail, hasLength } from "@mantine/form";
import { useForm } from "@mantine/form";
import { IconAlertCircle, IconX } from "@tabler/icons-react";
import { useUI } from "../contexts/UIContext";
import { useAuth } from "../contexts/AuthContext";
import { AxiosError } from "axios";

interface FormValues {
  email: string;
  password: string;
}

const SignInModal = () => {
  const { setShowModal } = useUI();
  const { signIn } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      setError("");
      setLoading(true);

      await signIn(values.email, values.password);

      setShowModal("null");
    } catch (err) {
      console.log(err);
      if (err && err instanceof AxiosError) setError(err.response?.data.message || err.message || "Axios error");
      else if (err && err instanceof Error) setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowModal("null");
  };

  return (
    <Container p={0}>
      <Container p={25}>
        <Flex align={"center"} justify={"space-between"}>
          <Title>Sign in</Title>
          <CloseButton title="Close sign in" size={"lg"} onClick={handleClose} />
        </Flex>
      </Container>

      <Divider />

      <Container p={25}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput data-autofocus label="Email" {...form.getInputProps("email")} withAsterisk />
            <PasswordInput label="Password" {...form.getInputProps("password")} withAsterisk />

            {error !== "" && (
              <Alert color="red" variant="filled" icon={<IconAlertCircle size="2rem" stroke={3} />} title="Poop!">
                <Text fw={"700"}>{error}</Text>
              </Alert>
            )}

            <Button loading={loading} mt={30} type="submit">
              Sign in
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

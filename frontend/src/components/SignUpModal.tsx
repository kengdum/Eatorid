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
import { isEmail, hasLength, matchesField } from "@mantine/form";
import { useForm } from "@mantine/form";
import { IconAlertCircle, IconCheck, IconX } from "@tabler/icons-react";
import { useUI } from "../contexts/UIContext";
import { useAuth } from "../contexts/AuthContext";
import { AxiosError } from "axios";

interface FormValues {
  email: string;
  name: string;
  password: string;
}

const SignUpModal = () => {
  const { setShowModal } = useUI();
  const { signUp } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      name: hasLength({ min: 2, max: 16 }, "Name must be 2-16 characters long"),
      email: isEmail("Invalid email"),
      password: hasLength({ min: 6 }, "Password must be at least 6 characters long"),
      confirmPassword: matchesField("password", "Passwords are not the same"),
    },
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      setError("");
      setLoading(true);
      await signUp(values.email, values.name, values.password);
      setMessage("Account created successfully");
      form.reset();
    } catch (err) {
      if (err && err instanceof AxiosError) setError(err.response?.data.message || err.message || "Axios code");
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
          <Title>Sign up</Title>
          <CloseButton title="Close sign in" size={"lg"} onClick={handleClose} />
        </Flex>
      </Container>

      <Divider />

      <Container p={25}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput data-autofocus label="Name" {...form.getInputProps("name")} withAsterisk />
            <TextInput label="Email" {...form.getInputProps("email")} withAsterisk />
            <PasswordInput label="Password" {...form.getInputProps("password")} withAsterisk />
            <PasswordInput label="Confirm password" {...form.getInputProps("confirmPassword")} withAsterisk />

            {error !== "" && (
              <Alert color="red" variant="filled" icon={<IconAlertCircle size="2rem" stroke={3} />} title="Poop!">
                <Text fw={"700"}>{error}</Text>
              </Alert>
            )}

            {message !== "" && (
              <Alert color="green" variant="filled" icon={<IconCheck />} title="Cool!">
                {message}
              </Alert>
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
          Already signed up?{" "}
          <Anchor fw="700" component="button" type="button" onClick={() => setShowModal("signin")}>
            Sign in
          </Anchor>
        </Text>
      </Container>
    </Container>
  );
};

export default SignUpModal;

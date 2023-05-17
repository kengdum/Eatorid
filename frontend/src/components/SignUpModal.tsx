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
import { isEmail, isNotEmpty, hasLength, matchesField } from "@mantine/form";
import { useForm } from "@mantine/form";
import React from "react";
import { Link } from "react-router-dom";
import { IconX } from "@tabler/icons-react";
import { useUI } from "../contexts/UIContext";
import { useAuth } from "../contexts/AuthContext";

interface FormValues {
  email: string;
  name: string;
  password: string;
}

const SignUpModal = () => {
  const { setShowModal } = useUI();
  const { signUp } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      setLoading(true);
      setError("");

      const { email, name, password } = values;

      await signUp(email, name, password);
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
          <Title>Sign up</Title>
          <ActionIcon size="lg" onClick={() => setShowModal("null")}>
            <IconX size={"100%"} />
          </ActionIcon>
        </Flex>
      </Container>

      <Divider />

      <Container p={25}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput label="Name" {...form.getInputProps("name")} withAsterisk />
            <TextInput label="Email" {...form.getInputProps("email")} withAsterisk />
            <PasswordInput label="Password" {...form.getInputProps("password")} withAsterisk />
            <PasswordInput label="Confirm password" {...form.getInputProps("confirmPassword")} withAsterisk />

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

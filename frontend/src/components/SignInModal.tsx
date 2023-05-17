import { Button, Container, Divider, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";

const SignInModal = () => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  return (
    <Container>
      <Title>Sign in</Title>
      <Divider />
      <form onSubmit={form.onSubmit(console.log)}>
        <TextInput label="Email" {...form.getInputProps("email")} withAsterisk />
        <Button type="submit">Sign in</Button>
      </form>
    </Container>
  );
};

export default SignInModal;

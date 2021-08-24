import { useMutation, Link, Routes } from "blitz"
import { Box, Divider, Flex, Text } from "@chakra-ui/react"

import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  return (
    <>
      <Form
        submitText="Create Account"
        submitProps={{
          width: "100%",
          colorScheme: "teal",
        }}
        schema={Signup}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await signupMutation(values)
            props.onSuccess?.()
          } catch (error) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              return { email: "This email is already being used" }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
      </Form>
      <Divider m={4} />
      <Flex justifyContent="flex-end">
        <Text mr={2}>Or</Text>
        <Box fontWeight="bolder">
          <Link href={Routes.LoginPage()}>Login</Link>
        </Box>
      </Flex>
    </>
  )
}

export default SignupForm

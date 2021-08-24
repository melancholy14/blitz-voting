import { AuthenticationError, Link, useMutation, Routes } from "blitz"
import { Box, Divider, Flex, Text } from "@chakra-ui/react"

import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <>
      <Form
        submitText="Login"
        submitProps={{
          width: "100%",
          colorScheme: "teal",
        }}
        schema={Login}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await loginMutation(values)
            props.onSuccess?.()
          } catch (error) {
            if (error instanceof AuthenticationError) {
              return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
            } else {
              return {
                [FORM_ERROR]:
                  "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
              }
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
        <Flex justifyContent="flex-end" fontSize="sm" fontStyle="italic">
          <Link href={Routes.ForgotPasswordPage()}>
            <a>Forgot your password?</a>
          </Link>
        </Flex>
      </Form>
      <Divider m={4} />
      <Flex justifyContent="flex-end">
        <Text mr={2}>Or</Text>
        <Box fontWeight="bolder">
          <Link href={Routes.SignupPage()}>Sign Up</Link>
        </Box>
      </Flex>
    </>
  )
}

export default LoginForm

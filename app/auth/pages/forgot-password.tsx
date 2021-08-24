import { BlitzPage, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { ForgotPassword } from "app/auth/validations"
import forgotPassword from "app/auth/mutations/forgotPassword"
import { Flex, Heading, Text } from "@chakra-ui/react"
import CenterFormWithHeading from "app/core/components/CenterFormWithHeading"

const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)

  return (
    <CenterFormWithHeading headingText="Forgot your password?">
      {isSuccess ? (
        <Flex direction="column">
          <Heading as="h2" size="lg">
            Request Submitted
          </Heading>
          <Text mt={2}>
            If your email is in our system, you will receive instructions to reset your password
            shortly.
          </Text>
        </Flex>
      ) : (
        <Form
          submitText="Send Reset Password Instructions"
          submitProps={{
            width: "100%",
            colorScheme: "teal",
          }}
          schema={ForgotPassword}
          initialValues={{ email: "" }}
          onSubmit={async (values) => {
            try {
              await forgotPasswordMutation(values)
            } catch (error) {
              return {
                [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
              }
            }
          }}
        >
          <LabeledTextField name="email" label="Email" placeholder="Email" />
        </Form>
      )}
    </CenterFormWithHeading>
  )
}

ForgotPasswordPage.redirectAuthenticatedTo = "/"
ForgotPasswordPage.getLayout = (page) => <Layout title="Forgot Your Password?">{page}</Layout>

export default ForgotPasswordPage

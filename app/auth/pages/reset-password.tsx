import { BlitzPage, useRouterQuery, Link, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { ResetPassword } from "app/auth/validations"
import resetPassword from "app/auth/mutations/resetPassword"
import CenterFormWithHeading from "app/core/components/CenterFormWithHeading"
import { Flex, Heading, Text } from "@chakra-ui/react"

const ResetPasswordPage: BlitzPage = () => {
  const query = useRouterQuery()
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword)

  return (
    <CenterFormWithHeading headingText="Set a New Password">
      {isSuccess ? (
        <Flex direction="column">
          <Heading as="h2" size="lg">
            Password Reset Successfully
          </Heading>
          <Text mt={2}>
            Go to the <Link href={Routes.Home()}>homepage</Link>
          </Text>
        </Flex>
      ) : (
        <Form
          submitText="Reset Password"
          submitProps={{
            width: "100%",
            colorScheme: "teal",
          }}
          schema={ResetPassword}
          initialValues={{ password: "", passwordConfirmation: "", token: query.token as string }}
          onSubmit={async (values) => {
            try {
              await resetPasswordMutation(values)
            } catch (error) {
              if (error.name === "ResetPasswordError") {
                return {
                  [FORM_ERROR]: error.message,
                }
              } else {
                return {
                  [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
                }
              }
            }
          }}
        >
          <LabeledTextField name="password" label="New Password" type="password" />
          <LabeledTextField
            name="passwordConfirmation"
            label="Confirm New Password"
            type="password"
          />
        </Form>
      )}
    </CenterFormWithHeading>
  )
}

ResetPasswordPage.redirectAuthenticatedTo = "/"
ResetPasswordPage.getLayout = (page) => <Layout title="Reset Your Password">{page}</Layout>

export default ResetPasswordPage

import { useRouter, BlitzPage, Routes } from "blitz"

import Layout from "app/core/layouts/Layout"
import { SignupForm } from "app/auth/components/SignupForm"
import CenterFormWithHeading from "app/core/components/CenterFormWithHeading"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <CenterFormWithHeading headingText="Create an Account">
      <SignupForm onSuccess={() => router.push(Routes.Home())} />
    </CenterFormWithHeading>
  )
}

SignupPage.redirectAuthenticatedTo = "/"
SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage

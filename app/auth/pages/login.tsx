import { useRouter, BlitzPage } from "blitz"

import Layout from "app/core/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"
import CenterFormWithHeading from "app/core/components/CenterFormWithHeading"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <CenterFormWithHeading headingText="Login">
      <LoginForm
        onSuccess={() => {
          const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
          router.push(next)
        }}
      />
    </CenterFormWithHeading>
  )
}

LoginPage.redirectAuthenticatedTo = "/"
LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage

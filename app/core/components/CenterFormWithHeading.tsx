import { Flex, Heading } from "@chakra-ui/react"
import { ReactNode } from "react"

export interface CenterFormWithHeadingProps {
  headingText: string
  children?: ReactNode
}

function CenterFormWithHeading({ headingText, children }: CenterFormWithHeadingProps) {
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex direction="column" background="gray.100" p={12} rounded={6}>
        <Heading as="h1" mb={6}>
          {headingText}
        </Heading>
        {children}
      </Flex>
    </Flex>
  )
}

export default CenterFormWithHeading

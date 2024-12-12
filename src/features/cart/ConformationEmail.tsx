import {Html, Body, Head, Heading, Hr, Container, Preview, Section, Text} from "@react-email/components"
import { Tailwind } from "@react-email/tailwind"


const ConformationEmail = () => {
  return (
    <Html>
      <Head/>
      <Preview>Thank you for your purchase with Daichi Koyanagi !</Preview>
      <Tailwind>
        <Body className="bg-slate-200">
          <Container>
            <Section className="bg-white p-10 ">
              <Heading className="leading-tight">Your order is confirmed and will be processed shortly.</Heading>
              <Hr/>
              <Text>If you have any questions, please contact our support team under takangi2468@gmail.com.</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>

    </Html>
  )
}

export default ConformationEmail
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { EMAIL_LOGO_URL } from "@/lib/emailBranding";

interface NewsletterFormNotificationEmailProps {
  email?: string;
  logoUrl?: string;
}

const DEFAULT_LOGO_URL = EMAIL_LOGO_URL;
const BRAND_BLUE = "#29285D";
const BRAND_GREEN = "#2CA382";
const BRAND_ORANGE = "#F15B3B";
const OFF_WHITE = "#FAF9F6";
const TEXT = "#333333";

export default function NewsletterFormNotificationEmail({
  email,
  logoUrl = DEFAULT_LOGO_URL,
}: NewsletterFormNotificationEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>New newsletter subscriber: {email || "new subscriber"}</Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Section style={headerStyle}>
            <Img
              src={logoUrl}
              width="280"
              height="74"
              alt="Discover and Grow"
              style={logoStyle}
            />
          </Section>

          <Section style={contentStyle}>
            <Heading as="h1" style={headingStyle}>
              New Newsletter Subscriber
            </Heading>
            <Text style={paragraphStyle}>
              Someone new has joined the Discover and Grow community.
            </Text>

            <Section style={subscriberCardStyle}>
              <Text style={labelStyle}>Email address</Text>
              <Text style={emailStyle}>{email}</Text>
            </Section>

            <Text style={noteStyle}>
              This is an automatic notification from the newsletter form on
              the Discover and Grow website.
            </Text>

            <Section style={buttonSectionStyle}>
              <Button
                href="https://www.discoverandgrow.org"
                style={buttonStyle}
              >
                Visit the Website
              </Button>
            </Section>
          </Section>

          <Hr style={dividerStyle} />
          <Section style={footerStyle}>
            <Text style={footerTextStyle}>
              Discover and Grow, Inc. · New York City · EIN 87-1397816
            </Text>
            <Text style={footerLinkTextStyle}>
              <Link href="mailto:info@discoverandgrow.org" style={footerLinkStyle}>
                info@discoverandgrow.org
              </Link>{" "}
              ·{" "}
              <Link href="https://www.discoverandgrow.org" style={footerLinkStyle}>
                www.discoverandgrow.org
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

NewsletterFormNotificationEmail.PreviewProps = {
  email: "subscriber@example.com",
  logoUrl: DEFAULT_LOGO_URL,
} satisfies NewsletterFormNotificationEmailProps;

const bodyStyle = {
  backgroundColor: OFF_WHITE,
  color: TEXT,
  fontFamily: "Arial, Helvetica, sans-serif",
  margin: 0,
  padding: "32px 12px",
};

const containerStyle = {
  backgroundColor: "#FFFFFF",
  border: "1px solid #E8E7E2",
  borderRadius: "16px",
  margin: "0 auto",
  maxWidth: "620px",
  overflow: "hidden",
};

const headerStyle = {
  backgroundColor: "#FFFFFF",
  padding: "30px 36px 18px",
  textAlign: "center" as const,
};

const logoStyle = {
  display: "block",
  height: "auto",
  margin: "0 auto",
  maxWidth: "280px",
  width: "100%",
};

const contentStyle = { padding: "12px 36px 32px" };

const headingStyle = {
  color: BRAND_BLUE,
  fontSize: "30px",
  lineHeight: "1.22",
  margin: "12px 0 26px",
  textAlign: "center" as const,
};

const paragraphStyle = {
  color: TEXT,
  fontSize: "16px",
  lineHeight: "1.65",
  margin: "0 0 16px",
};

const subscriberCardStyle = {
  backgroundColor: "#F2F8F6",
  borderLeft: `4px solid ${BRAND_GREEN}`,
  borderRadius: "8px",
  margin: "26px 0",
  padding: "20px 22px",
};

const labelStyle = {
  color: "#555555",
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  margin: "0 0 8px",
  textTransform: "uppercase" as const,
};

const emailStyle = {
  color: BRAND_BLUE,
  fontSize: "18px",
  fontWeight: 700,
  lineHeight: "1.4",
  margin: 0,
  overflowWrap: "anywhere" as const,
};

const noteStyle = {
  ...paragraphStyle,
  color: "#666666",
  fontSize: "14px",
};

const buttonSectionStyle = {
  margin: "26px 0 0",
  textAlign: "center" as const,
};

const buttonStyle = {
  backgroundColor: BRAND_ORANGE,
  borderRadius: "999px",
  color: "#FFFFFF",
  display: "inline-block",
  fontSize: "14px",
  fontWeight: 700,
  padding: "12px 22px",
  textDecoration: "none",
};

const dividerStyle = { borderColor: "#E8E7E2", margin: 0 };

const footerStyle = {
  backgroundColor: BRAND_BLUE,
  padding: "18px 30px",
};

const footerTextStyle = {
  color: "#FFFFFF",
  fontSize: "12px",
  lineHeight: "1.5",
  margin: "0 0 4px",
  textAlign: "center" as const,
};

const footerLinkTextStyle = { ...footerTextStyle, margin: 0 };
const footerLinkStyle = { color: "#FFFFFF", textDecoration: "underline" };

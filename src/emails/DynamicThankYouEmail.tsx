import {
  Body,
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
import { DEFAULT_DYNAMIC_THANK_YOU_CONTENT } from "@/lib/dynamicFormSubmission";
import { EMAIL_LOGO_URL } from "@/lib/emailBranding";

interface ThankYouEmailProps {
  thankYouContent?: string;
  recipientName?: string;
  formTitle?: string;
  logoUrl?: string;
}

const DEFAULT_LOGO_URL = EMAIL_LOGO_URL;
const BRAND_BLUE = "#29285D";
const BRAND_GREEN = "#2CA382";
const OFF_WHITE = "#FAF9F6";
const TEXT = "#333333";

export default function DynamicThankYouEmail({
  thankYouContent = DEFAULT_DYNAMIC_THANK_YOU_CONTENT,
  recipientName,
  formTitle = "Contact Form",
  logoUrl = DEFAULT_LOGO_URL,
}: ThankYouEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Thank you for contacting Discover and Grow</Preview>
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
              Thank You{recipientName ? `, ${recipientName}` : ""}!
            </Heading>
            <Text style={paragraphStyle}>
              We&apos;ve received your {formTitle.toLowerCase()} submission.
            </Text>
            <Section style={messageStyle}>
              <div
                style={messageTextStyle}
                dangerouslySetInnerHTML={{ __html: thankYouContent }}
              />
            </Section>
            <Text style={paragraphStyle}>
              If you need anything else in the meantime, you can reach us at{" "}
              <Link href="mailto:info@discoverandgrow.org" style={linkStyle}>
                info@discoverandgrow.org
              </Link>
              .
            </Text>
          </Section>

          <Hr style={dividerStyle} />
          <Section style={footerStyle}>
            <Text style={footerTextStyle}>
              Discover and Grow, Inc. · New York City · EIN 87-1397816
            </Text>
            <Text style={footerLinkTextStyle}>
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

DynamicThankYouEmail.PreviewProps = {
  recipientName: "Jordan",
  formTitle: "Contact Form",
  thankYouContent: DEFAULT_DYNAMIC_THANK_YOU_CONTENT,
  logoUrl: DEFAULT_LOGO_URL,
} satisfies ThankYouEmailProps;

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
  margin: "12px 0 20px",
  textAlign: "center" as const,
};

const paragraphStyle = {
  color: TEXT,
  fontSize: "16px",
  lineHeight: "1.65",
  margin: "0 0 16px",
};

const messageStyle = {
  backgroundColor: "#F2F8F6",
  borderLeft: `4px solid ${BRAND_GREEN}`,
  borderRadius: "8px",
  margin: "26px 0",
  padding: "18px 22px",
};

const messageTextStyle = {
  color: TEXT,
  fontSize: "16px",
  lineHeight: "1.65",
};

const linkStyle = {
  color: BRAND_GREEN,
  fontWeight: 700,
  textDecoration: "underline",
};

const dividerStyle = { borderColor: "#E8E7E2", margin: 0 };
const footerStyle = { backgroundColor: BRAND_BLUE, padding: "18px 30px" };
const footerTextStyle = {
  color: "#FFFFFF",
  fontSize: "12px",
  lineHeight: "1.5",
  margin: "0 0 4px",
  textAlign: "center" as const,
};
const footerLinkTextStyle = { ...footerTextStyle, margin: 0 };
const footerLinkStyle = { color: "#FFFFFF", textDecoration: "underline" };

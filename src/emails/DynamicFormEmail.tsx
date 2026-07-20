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
import type { SubmittedFormField } from "@/lib/dynamicFormSubmission";

interface FormSubmissionProps {
  formTitle: string;
  formData: SubmittedFormField[];
  submittedAt: string;
  userIP?: string;
  logoUrl?: string;
}

const DEFAULT_LOGO_URL =
  "https://www.discoverandgrow.org/images/discover-and-grow-logo-email.png";
const BRAND_BLUE = "#29285D";
const BRAND_GREEN = "#2CA382";
const OFF_WHITE = "#FAF9F6";
const TEXT = "#333333";

export default function DynamicFormEmail({
  formTitle = "Contact Form",
  formData = [],
  submittedAt = new Date().toLocaleString(),
  userIP,
  logoUrl = DEFAULT_LOGO_URL,
}: FormSubmissionProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>New {formTitle} submission</Preview>
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
              New {formTitle} Submission
            </Heading>
            <Text style={metadataStyle}>
              Submitted {submittedAt}
              {userIP ? ` · IP: ${userIP}` : ""}
            </Text>

            {formData.map((field, index) => (
              <Section key={`${field.label}-${index}`} style={fieldStyle}>
                <Text style={fieldLabelStyle}>{field.label}</Text>
                <Text style={fieldValueStyle}>
                  {field.value || "(No response)"}
                </Text>
              </Section>
            ))}
          </Section>

          <Hr style={dividerStyle} />
          <Section style={footerStyle}>
            <Text style={footerTextStyle}>
              Discover and Grow, Inc. · New York City · EIN 87-1397816
            </Text>
            <Text style={footerLinkTextStyle}>
              <Link href="mailto:info@discoverandgrow.org" style={footerLinkStyle}>
                info@discoverandgrow.org
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

DynamicFormEmail.PreviewProps = {
  formTitle: "Contact Form",
  formData: [
    { label: "Name", value: "Jordan Smith", type: "text" },
    { label: "Email", value: "jordan@example.com", type: "email" },
    { label: "Message", value: "I would love to learn more.", type: "textarea" },
  ],
  submittedAt: "July 20, 2026, 3:30 PM",
  logoUrl: DEFAULT_LOGO_URL,
} satisfies FormSubmissionProps;

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
  margin: "12px 0 12px",
  textAlign: "center" as const,
};

const metadataStyle = {
  color: "#666666",
  fontSize: "13px",
  lineHeight: "1.5",
  margin: "0 0 26px",
  textAlign: "center" as const,
};

const fieldStyle = {
  backgroundColor: "#F2F8F6",
  borderLeft: `4px solid ${BRAND_GREEN}`,
  borderRadius: "8px",
  margin: "0 0 12px",
  padding: "14px 18px",
};

const fieldLabelStyle = {
  color: BRAND_BLUE,
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  margin: "0 0 6px",
  textTransform: "uppercase" as const,
};

const fieldValueStyle = {
  color: TEXT,
  fontSize: "15px",
  lineHeight: "1.55",
  margin: 0,
  whiteSpace: "pre-wrap" as const,
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

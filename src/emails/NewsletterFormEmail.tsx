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

interface NewsletterFormEmailProps {
  logoUrl?: string;
}

const DEFAULT_LOGO_URL = EMAIL_LOGO_URL;
const BRAND_BLUE = "#29285D";
const BRAND_GREEN = "#2CA382";
const BRAND_ORANGE = "#F15B3B";
const OFF_WHITE = "#FAF9F6";
const TEXT = "#333333";

export default function NewsletterFormEmail({
  logoUrl = DEFAULT_LOGO_URL,
}: NewsletterFormEmailProps = {}) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Welcome to the Discover and Grow community</Preview>
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
              Welcome to the Discover and Grow Community 💛
            </Heading>

            <Text style={paragraphStyle}>
              Thank you for subscribing to our newsletter. We&apos;re so glad
              you&apos;re here.
            </Text>
            <Text style={paragraphStyle}>
              You&apos;ll receive thoughtful updates about the work we&apos;re
              doing with children, caregivers, schools, and communities—along
              with practical resources that support social, emotional, and
              relational well-being.
            </Text>

            <Section style={highlightsStyle}>
              <Heading as="h2" style={sectionHeadingStyle}>
                What you can expect
              </Heading>
              <Text style={highlightStyle}>
                Program news and community stories
              </Text>
              <Text style={highlightStyle}>
                Parenting and social-emotional learning resources
              </Text>
              <Text style={highlightStyle}>
                Upcoming workshops, events, and ways to get involved
              </Text>
            </Section>

            <Section style={buttonSectionStyle}>
              <Button
                href="https://www.discoverandgrow.org"
                style={buttonStyle}
              >
                Visit Discover and Grow
              </Button>
            </Section>

            <Text style={paragraphStyle}>
              In the meantime, follow along on{" "}
              <Link
                href="https://www.instagram.com/Discoverandgrow/"
                style={linkStyle}
              >
                Instagram
              </Link>{" "}
              and{" "}
              <Link
                href="https://www.tiktok.com/@discover.and.grow"
                style={linkStyle}
              >
                TikTok
              </Link>
              .
            </Text>

            <Text style={signatureStyle}>
              With gratitude,
              <br />
              <strong>Gladys Henriquez</strong>
              <br />
              Founder &amp; Executive Director
              <br />
              Discover and Grow
            </Text>
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

NewsletterFormEmail.PreviewProps = {
  logoUrl: DEFAULT_LOGO_URL,
} satisfies NewsletterFormEmailProps;

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

const sectionHeadingStyle = {
  color: BRAND_BLUE,
  fontSize: "19px",
  lineHeight: "1.35",
  margin: "0 0 14px",
};

const paragraphStyle = {
  color: TEXT,
  fontSize: "16px",
  lineHeight: "1.65",
  margin: "0 0 16px",
};

const highlightsStyle = {
  backgroundColor: "#F2F8F6",
  borderLeft: `4px solid ${BRAND_GREEN}`,
  borderRadius: "8px",
  margin: "26px 0",
  padding: "20px 22px 12px",
};

const highlightStyle = {
  color: TEXT,
  fontSize: "15px",
  lineHeight: "1.5",
  margin: "0 0 11px",
  paddingLeft: "4px",
};

const buttonSectionStyle = {
  margin: "26px 0",
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

const linkStyle = {
  color: BRAND_GREEN,
  fontWeight: 700,
  textDecoration: "underline",
};

const signatureStyle = {
  ...paragraphStyle,
  marginTop: "26px",
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

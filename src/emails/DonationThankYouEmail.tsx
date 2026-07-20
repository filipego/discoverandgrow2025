import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import type { DonationAcknowledgmentDetails } from "@/lib/donationAcknowledgment";

type DonationThankYouEmailProps = DonationAcknowledgmentDetails & {
  logoUrl: string;
};

const BRAND_BLUE = "#29285D";
const BRAND_GREEN = "#2CA382";
const BRAND_ORANGE = "#F15B3B";
const OFF_WHITE = "#FAF9F6";
const TEXT = "#333333";

export default function DonationThankYouEmail({
  firstName,
  amount,
  date,
  transactionId,
  donationType,
  receiptUrl,
  logoUrl,
}: DonationThankYouEmailProps) {
  const receiptLabel =
    donationType === "monthly"
      ? "View Your Stripe Invoice & Receipt"
      : "View Your Stripe Receipt";

  return (
    <Html lang="en">
      <Head />
      <Preview>Thank you for supporting Discover and Grow 💛</Preview>
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
              Thank You for Supporting Discover and Grow 💛
            </Heading>

            <Text style={paragraphStyle}>Dear {firstName},</Text>
            <Text style={paragraphStyle}>
              Thank you so much for your generous gift to Discover and Grow.
              Your support helps us bring life-changing education and
              parent-child connection tools to families, schools, and
              communities that need them most.
            </Text>
            <Text style={emphasisStyle}>
              Your donation is already making a difference.
            </Text>

            <Section style={summaryStyle}>
              <Heading as="h2" style={sectionHeadingStyle}>
                Here&apos;s a summary of your gift
              </Heading>
              <Row style={summaryRowStyle}>
                <Column style={summaryLabelStyle}>Donation Amount</Column>
                <Column align="right" style={summaryValueStyle}>
                  {amount}
                </Column>
              </Row>
              <Row style={summaryRowStyle}>
                <Column style={summaryLabelStyle}>Date</Column>
                <Column align="right" style={summaryValueStyle}>
                  {date}
                </Column>
              </Row>
              <Row>
                <Column style={summaryLabelStyle}>Transaction ID</Column>
                <Column align="right" style={transactionValueStyle}>
                  {transactionId}
                </Column>
              </Row>
              {receiptUrl && (
                <Section style={buttonSectionStyle}>
                  <Button href={receiptUrl} style={buttonStyle}>
                    {receiptLabel}
                  </Button>
                </Section>
              )}
            </Section>

            <Heading as="h2" style={sectionHeadingStyle}>
              Tax-Deductible Receipt
            </Heading>
            <Text style={paragraphStyle}>
              As a 501(c)(3) nonprofit organization, your contribution is
              tax-deductible to the fullest extent allowed by law.
            </Text>
            <Text style={receiptStatementStyle}>
              <strong>EIN:</strong> 87-1397816
              <br />
              No goods or services were provided in exchange for this
              contribution.
            </Text>

            <Heading as="h2" style={sectionHeadingStyle}>
              What your support makes possible
            </Heading>
            <Text style={impactStyle}>
              <strong>$25</strong> provides SEL materials for a classroom
            </Text>
            <Text style={impactStyle}>
              <strong>$100</strong> funds a student SEL session
            </Text>
            <Text style={impactStyle}>
              <strong>$500</strong> sponsors a parent in our 8-week Circle of
              Security® Parenting cohort
            </Text>

            <Text style={paragraphStyle}>
              If you haven&apos;t already, we invite you to stay connected with
              us through our{" "}
              <Link
                href="https://www.discoverandgrow.org/#newsletter"
                style={linkStyle}
              >
                newsletter
              </Link>
              ,{" "}
              <Link
                href="https://www.instagram.com/Discoverandgrow/"
                style={linkStyle}
              >
                Instagram
              </Link>
              , or{" "}
              <Link
                href="https://www.tiktok.com/@discover.and.grow"
                style={linkStyle}
              >
                TikTok
              </Link>
              , where you&apos;ll see the real-world impact of your gift.
            </Text>

            <Text style={signatureStyle}>
              With gratitude,
              <br />
              <strong>Gladys Henriquez</strong>
              <br />
              Founder &amp; Executive Director
              <br />
              Discover and Grow
              <br />
              <Link href="mailto:info@discoverandgrow.org" style={linkStyle}>
                info@discoverandgrow.org
              </Link>
              <br />
              <Link href="https://www.discoverandgrow.org" style={linkStyle}>
                www.discoverandgrow.org
              </Link>
            </Text>
          </Section>

          <Hr style={dividerStyle} />
          <Section style={footerStyle}>
            <Text style={footerTextStyle}>
              Discover and Grow, Inc. · New York City · EIN 87-1397816
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

DonationThankYouEmail.PreviewProps = {
  firstName: "Jordan",
  email: "jordan@example.com",
  amount: "$100.00",
  date: "July 20, 2026",
  transactionId: "pi_example123456789",
  donationType: "one-time",
  receiptUrl: "https://pay.stripe.com/receipts/example",
  logoUrl:
    "https://www.discoverandgrow.org/images/discover-and-grow-logo-email.png",
} satisfies DonationThankYouEmailProps;

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
  margin: "28px 0 12px",
};

const paragraphStyle = {
  color: TEXT,
  fontSize: "16px",
  lineHeight: "1.65",
  margin: "0 0 16px",
};

const emphasisStyle = {
  ...paragraphStyle,
  color: BRAND_GREEN,
  fontWeight: 700,
};

const summaryStyle = {
  backgroundColor: OFF_WHITE,
  borderLeft: `4px solid ${BRAND_GREEN}`,
  borderRadius: "8px",
  margin: "26px 0",
  padding: "2px 22px 22px",
};

const summaryRowStyle = {
  borderBottom: "1px solid #DDDCD7",
};

const summaryLabelStyle = {
  color: "#555555",
  fontSize: "14px",
  padding: "10px 0",
};

const summaryValueStyle = {
  color: BRAND_BLUE,
  fontSize: "15px",
  fontWeight: 700,
  padding: "10px 0",
};

const transactionValueStyle = {
  ...summaryValueStyle,
  fontFamily: "Courier New, monospace",
  fontSize: "12px",
};

const buttonSectionStyle = {
  marginTop: "20px",
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

const receiptStatementStyle = {
  ...paragraphStyle,
  backgroundColor: "#F2F8F6",
  borderRadius: "8px",
  padding: "14px 16px",
};

const impactStyle = {
  ...paragraphStyle,
  borderLeft: `3px solid ${BRAND_ORANGE}`,
  marginBottom: "10px",
  paddingLeft: "12px",
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

const dividerStyle = {
  borderColor: "#E8E7E2",
  margin: 0,
};

const footerStyle = {
  backgroundColor: BRAND_BLUE,
  padding: "18px 30px",
};

const footerTextStyle = {
  color: "#FFFFFF",
  fontSize: "12px",
  lineHeight: "1.5",
  margin: 0,
  textAlign: "center" as const,
};

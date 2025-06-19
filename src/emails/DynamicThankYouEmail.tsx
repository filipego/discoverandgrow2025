import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
} from '@react-email/components';

interface ThankYouEmailProps {
  thankYouContent: string;
  recipientName?: string;
  formTitle?: string;
}

export default function DynamicThankYouEmail({ 
  thankYouContent = "Thank you for reaching out to us! We've received your message and will get back to you within 24 hours.",
  recipientName = "John",
  formTitle = "Contact Form"
}: ThankYouEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f6f6f6' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', padding: '20px' }}>
          <Heading style={{ color: '#333333', fontSize: '24px', marginBottom: '20px' }}>
            Thank You{recipientName ? `, ${recipientName}` : ''}!
          </Heading>
          
          {formTitle && (
            <Text style={{ color: '#666666', fontSize: '16px', marginBottom: '20px' }}>
              We've received your {formTitle.toLowerCase()} submission.
            </Text>
          )}
          
          <div 
            style={{ 
              color: '#666666', 
              fontSize: '14px', 
              lineHeight: '1.6',
              marginBottom: '20px'
            }}
            dangerouslySetInnerHTML={{ __html: thankYouContent }} 
          />
          
          <Text style={{ 
            color: '#999999', 
            fontSize: '12px', 
            marginTop: '30px',
            borderTop: '1px solid #eeeeee',
            paddingTop: '15px'
          }}>
            This is an automated response. Please do not reply to this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
} 
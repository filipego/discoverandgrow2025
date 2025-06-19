import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Section,
} from '@react-email/components';

interface FormSubmissionProps {
  formTitle: string;
  formData: Array<{ label: string; value: string; type: string }>;
  submittedAt: string;
  userIP?: string;
}

export default function DynamicFormEmail({ 
  formTitle = "Contact Form", 
  formData = [
    { label: "First Name", value: "John", type: "text" },
    { label: "Last Name", value: "Doe", type: "text" },
    { label: "Email", value: "john@example.com", type: "email" },
    { label: "Message", value: "Hello! I'm interested in your services.", type: "textarea" }
  ], 
  submittedAt = new Date().toLocaleString(),
  userIP = "192.168.1.1"
}: FormSubmissionProps) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f6f6f6' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', padding: '20px' }}>
          <Heading style={{ color: '#333333', fontSize: '24px', marginBottom: '20px' }}>
            New {formTitle} Submission
          </Heading>
          
          <Text style={{ color: '#666666', fontSize: '14px', marginBottom: '20px' }}>
            Submitted on: {submittedAt}
            {userIP && ` from IP: ${userIP}`}
          </Text>
          
          {formData.map((field, index) => (
            <Section key={index} style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
              <Text style={{ 
                margin: '0 0 5px 0', 
                fontWeight: 'bold', 
                color: '#333333',
                fontSize: '14px'
              }}>
                {field.label}:
              </Text>
              <Text style={{ 
                margin: '0', 
                color: '#666666',
                fontSize: '14px',
                whiteSpace: 'pre-wrap'
              }}>
                {field.value || '(No response)'}
              </Text>
            </Section>
          ))}
          
          <Text style={{ 
            color: '#999999', 
            fontSize: '12px', 
            marginTop: '30px',
            borderTop: '1px solid #eeeeee',
            paddingTop: '15px'
          }}>
            This email was sent from your website's contact form.
          </Text>
        </Container>
      </Body>
    </Html>
  );
} 
import { Body, Container, Head, Heading, Hr, Html, Section, Text } from '@react-email/components';
import React from 'react';

interface LeadEmailProps {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  projectType: string;
  budget: string;
  timeframe: string;
  description: string;
  score: number;
}

export const LeadEmail: React.FC<Readonly<LeadEmailProps>> = ({
  name,
  email,
  company,
  phone,
  projectType,
  budget,
  timeframe,
  description,
  score,
}) => {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'sans-serif', backgroundColor: '#f4f4f5' }}>
        <Container style={{ margin: '0 auto', padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Heading style={{ color: '#111827' }}>New Lead Received 🚀</Heading>
          
          <Section style={{ backgroundColor: '#f9fafb', padding: '16px', borderRadius: '4px' }}>
            <Text style={{ fontWeight: 'bold', fontSize: '18px', margin: '0 0 8px' }}>Lead Score: {score}/10</Text>
            
            <Text><strong>Name:</strong> {name}</Text>
            <Text><strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a></Text>
            <Text><strong>Company:</strong> {company || 'N/A'}</Text>
            <Text><strong>Phone:</strong> {phone || 'N/A'}</Text>
          </Section>

          <Hr style={{ borderColor: '#e5e7eb', margin: '20px 0' }} />

          <Section>
            <Heading as="h3" style={{ fontSize: '16px', color: '#374151' }}>Project Details</Heading>
            <Text><strong>Type:</strong> {projectType}</Text>
            <Text><strong>Budget:</strong> {budget}</Text>
            <Text><strong>Timeframe:</strong> {timeframe}</Text>
            
            <Text style={{ marginTop: '16px', fontWeight: 'bold' }}>Description:</Text>
            <Text style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px', fontStyle: 'italic' }}>
              {description}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

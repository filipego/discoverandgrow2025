import {
    Body,
    Html,
    Section,
    Tailwind,
    Text,
    Heading,
    Head,
} from "@react-email/components";
import * as React from "react";

interface ContactFormNotificationEmailProps {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
}

export default function ContactFormNotificationEmail({ name, email, phone, message }: ContactFormNotificationEmailProps) {
    return (
        <Html>
            <Head />
            <Tailwind>
                <Body className="bg-white my-12 mx-auto w-[600px]">
                    <Section className="px-[32px] py-[40px]">
                        <Heading>New Contact Form Submission</Heading>
                        <Text>Name: {name}</Text>
                        <Text>Email: {email}</Text>
                        <Text>Phone: {phone}</Text>
                        <Text>Message: {message}</Text>
                    </Section>
                </Body>
            </Tailwind>
        </Html>
    );
}
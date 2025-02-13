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

interface NewsletterFormNotificationEmailProps {
    email?: string;
}

export default function NewsletterFormNotificationEmail({ email }: NewsletterFormNotificationEmailProps) {
    return (
        <Html>
            <Head />
            <Tailwind>
                <Body className="bg-white my-12 mx-auto w-[600px]">
                    <Section className="px-[32px] py-[40px]">
                        <Heading>New Newsletter Subscription</Heading>
                        <Text>Email: {email}</Text>
                    </Section>
                </Body>
            </Tailwind>
        </Html>
    );
}
import {
    Body,
    Button,
    Html,
    Section,
    Container,
    Tailwind,
    Text,
    Heading,
    Img,
    Link,
    Head,
    Row,
    Column,
} from "@react-email/components";
import * as React from "react";

export default function NewsletterFormEmail() {
    return (
        <Html>
            <Head />
            <Tailwind>
                <Body className="bg-white my-12 mx-auto w-[600px]">
                    <Section className="px-[32px] py-[40px]">
                        <Row>
                            <Column className="w-[80%]">
                                <Img
                                    alt="React Email logo"
                                    height="42"
                                    src="https://react.email/static/logo-without-background.png"
                                />
                            </Column>
                            <Column align="right">
                                <Row align="right">
                                    <Column>
                                        <Link href="#">
                                            <Img
                                                alt="X"
                                                className="mx-[4px]"
                                                height="36"
                                                src="https://react.email/static/x-logo.png"
                                                width="36"
                                            />
                                        </Link>
                                    </Column>
                                    <Column>
                                        <Link href="#">
                                            <Img
                                                alt="Instagram"
                                                className="mx-[4px]"
                                                height="36"
                                                src="https://react.email/static/instagram-logo.png"
                                                width="36"
                                            />
                                        </Link>
                                    </Column>
                                    <Column>
                                        <Link href="#">
                                            <Img
                                                alt="Facebook"
                                                className="mx-[4px]"
                                                height="36"
                                                src="https://react.email/static/facebook-logo.png"
                                                width="36"
                                            />
                                        </Link>
                                    </Column>
                                </Row>
                            </Column>
                        </Row>
                    </Section>
                    <Section className="">
                        <Heading>
                            Newsletter
                        </Heading>
                        <Text>
                            Thank you for reaching out! We're excited to hear from you.
                        </Text>
                    </Section>
                </Body>
            </Tailwind>


        </Html>
    );
}

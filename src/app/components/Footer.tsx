import React from "react";
import { Bounded } from "./Bounded";
import { LongLogo } from "./LongLogo";
import { createClient } from "@/prismicio";
import { Heading } from "./Heading";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import NewsletterForm from "./Forms/NewsletterForm";
import { PrismicRichText } from "@prismicio/react";
import { HiOutlineEnvelope } from "react-icons/hi2";
import {
  FaInstagram,
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
} from "react-icons/fa6";
import { ButtonLink } from "./ButtonLink";

type Props = {};

const socialLinkLabels = [
  "Email Discover and Grow",
  "Discover and Grow on Instagram",
  "Discover and Grow on Facebook",
  "Discover and Grow on X",
  "Discover and Grow on LinkedIn",
];

export async function Footer({}: Props) {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <div className="relative mt-12 md:mt-30">
      <div
        className="h-16 w-full bg-cover bg-top bg-no-repeat md:h-40"
        style={{ backgroundImage: "url(/images/Ellipse.png)" }}
      />

      <Bounded className="!pt-0 pb-10 bg-[#29285D] text-white">
        <div>
          <div className="mb-10 flex flex-col gap-10 md:mb-40 md:flex-row md:gap-8">
            <div
              id="newsletter"
              className="w-full scroll-mt-24 md:w-2/6"
            >
              <Heading size="sm" color="brand-off-white" className="mb-6 md:mb-11">
                {settings.data.newsletter_title}
              </Heading>
              <div className="max-w-full md:max-w-[70%] [&_form]:mx-0 md:[&_form]:mx-auto">
                <NewsletterForm hideLabel={true} inputId="newsletter-email" />
              </div>
            </div>
            <div className="w-full md:w-3/6">
              <Heading size="sm" color="brand-off-white" className="mb-6 md:mb-10">
                {settings.data.donate_title}
              </Heading>
              <PrismicRichText
                field={settings.data.donate_body}
                components={{
                  paragraph: ({ children }) => (
                    <p className="mb-5 text-xs text-[#dfdfdf] lg:max-w-[375px]">
                      {children}
                    </p>
                  ),
                }}
              />

              <ButtonLink
                field={settings.data.button}
                color="Secondary"
                size="md"
              >
                {settings.data.button.text}
              </ButtonLink>
            </div>
            <div className="flex w-full flex-row items-start justify-start gap-3 md:w-1/6 md:flex-col md:items-end md:justify-center md:gap-4">
              {settings.data.social_links.map((link, index) => {
                const hoverColors = [
                  "hover:text-[#3B82F6]", // Email - blue
                  "hover:text-[#E4405F]", // Instagram - pink/red
                  "hover:text-[#1877F2]", // Facebook - blue
                  "hover:text-[#000000]", // Twitter/X - black
                  "hover:text-[#0077B5]", // LinkedIn - blue
                ];
                const iconClassName = "h-4 w-4 md:h-5 md:w-5";
                return (
                  <PrismicNextLink
                    key={link.key}
                    field={link}
                    aria-label={socialLinkLabels[index] ?? "Discover and Grow social link"}
                    className={`text-white ${hoverColors[index] || "hover:text-[#D93CA6]"} transition-colors`}
                  >
                    {index === 0 && <HiOutlineEnvelope className={iconClassName} />}
                    {index === 1 && <FaInstagram className={iconClassName} />}
                    {index === 2 && <FaFacebookF className={iconClassName} />}
                    {index === 3 && <FaXTwitter className={iconClassName} />}
                    {index === 4 && <FaLinkedinIn className={iconClassName} />}
                  </PrismicNextLink>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:gap-8">
            <div className="w-full md:w-2/6">
              <LongLogo treeColor="white" className="h-10 md:h-[60px]" />
            </div>
            <div className="w-full md:w-3/6">
              <PrismicRichText
                field={settings.data.footer_bio}
                components={{
                  paragraph: ({ children }) => (
                    <p className="mb-5 text-xs text-[#dfdfdf] last:mb-0 lg:max-w-[375px]">
                      {children}
                    </p>
                  ),
                }}
              />
            </div>
            <div className="hidden w-full md:block md:w-1/6" />
          </div>
        </div>
        
        <div className="relative mt-12 mb-0 md:mt-30">
          <div className="relative flex flex-col items-start justify-between gap-4 rounded-full px-2 py-4 md:flex-row md:items-center md:gap-0 md:border md:border-[#979797] md:px-6 md:py-3">
            <div className="flex w-full flex-col gap-0.5 text-[10px] text-white md:w-auto">
              <p className="hidden text-[11px] md:block">© 2025 DISCOVER AND GROW, INC - We are a 501(c)(3) nonprofit based in New York City EIN# 87-1397816</p>
              <div className="flex flex-col gap-0.5 md:hidden">
                <p className="text-[11px]">© 2025 DISCOVER AND GROW, INC</p>
                <p className="text-[11px]">We are a 501(c)(3) nonprofit based in New York City EIN# 87-1397816</p>
              </div>
            </div>
            <div className="flex w-full items-center justify-between gap-4 text-xs text-white md:ml-auto md:w-auto md:justify-end md:gap-6">
              <div className="flex flex-row gap-4 md:gap-6">
                {settings.data.documents_link.map((link, index) => (
                  <PrismicNextLink
                    key={link.key}
                    field={link}
                    className="hover:text-brand-green transition-colors"
                  >
                    {index === 0 && "Privacy Policy"}
                    {index === 1 && "Terms & Conditions"}
                  </PrismicNextLink>
                ))}
              </div>
              <PrismicNextImage
                field={settings.data.badge}
                width={70}
                height={70}
                className="h-12 w-12 shrink-0 md:hidden"
              />
            </div>
            <div className="absolute top-1/2 right-1/3 z-10 hidden -translate-y-1/2 translate-x-1/2 md:block">
              <PrismicNextImage
                field={settings.data.badge}
                width={70}
                height={70}
                className="h-20 w-20"
              />
            </div>
          </div>
        </div>
      </Bounded>
    </div>
  );
}

export default Footer;

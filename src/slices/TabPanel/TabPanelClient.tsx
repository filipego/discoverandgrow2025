"use client";

import { useState } from "react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { isFilled } from "@prismicio/client";
import type { Content } from "@prismicio/client";
import { Heading } from "@/app/components/Heading";
import { ButtonLink } from "@/app/components/ButtonLink";

type TabItem = {
  id: number;
  heading: string;
  body: Content.TabPanelSliceDefaultPrimaryContentItem["body"];
  link: Content.TabPanelSliceDefaultPrimaryContentItem["link"];
  image: Content.TabPanelSliceDefaultPrimaryContentItem["image"];
};

type TabPanelClientProps = {
  items: TabItem[];
};

const TabPanelClient = ({ items }: TabPanelClientProps) => {
  // First tab is active by default (index 0)
  const [activeTabId, setActiveTabId] = useState<number>(0);

  const handleTabClick = (tabId: number) => {
    setActiveTabId(tabId);
  };

  const activeTab = items.find(item => item.id === activeTabId) || items[0];

  return (
    <div className="w-full">
      {/* Mobile Layout - Image on top */}
      <div className="lg:hidden">
        {/* Image */}
        <div className="mb-8">
          <div className="max-w-8xl w-full">
            {isFilled.image(activeTab.image) && (
              <PrismicNextImage
                field={activeTab.image}
                className="w-full h-auto object-contain"
              />
            )}
          </div>
        </div>

        {/* Tabs below */}
        <div className="space-y-0">
          {items.map((item) => (
            <TabButton
              key={item.id}
              item={item}
              isActive={activeTabId === item.id}
              onClick={() => handleTabClick(item.id)}
            />
          ))}
        </div>
      </div>

      {/* Desktop Layout - Side by side */}
      <div className="hidden lg:block relative h-[400px]">
        <div className="grid grid-cols-2 gap-8 lg:gap-16">
          {/* Left Side - Tabs */}
          <div className="space-y-0">
            {items.map((item) => (
              <TabButton
                key={item.id}
                item={item}
                isActive={activeTabId === item.id}
                onClick={() => handleTabClick(item.id)}
              />
            ))}
          </div>

          {/* Right Side - Empty space */}
          <div></div>
        </div>

        {/* Image positioned absolutely - completely independent */}
        <div className="absolute top-0 bottom-0 right-0 w-1/2 flex items-center justify-center pointer-events-none">
          <div className="max-w-8xl w-full">
            {isFilled.image(activeTab.image) && (
              <PrismicNextImage
                field={activeTab.image}
                className="w-full h-auto object-contain"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

type TabButtonProps = {
  item: TabItem;
  isActive: boolean;
  onClick: () => void;
};

const TabButton = ({ item, isActive, onClick }: TabButtonProps) => {
  return (
    <div className={`border-l-4 ${
      isActive 
        ? 'border-l-brand-green' 
        : 'border-l-brand-light-gray'
    }`}>
      <button
        onClick={onClick}
        className={`w-full px-6 py-6 text-left transition-colors duration-200 hover:bg-gray-50 ${
          isActive ? 'cursor-default' : 'cursor-pointer'
        }`}
      >
        <Heading 
          as="h3" 
          size="xs" 
          className="text-brand-black"
        >
          {item.heading}
        </Heading>
      </button>
      
      {/* Content appears below title when active */}
      {isActive && (
        <div className="px-6 pb-6 space-y-4">
          {/* Rich Text Body */}
          {isFilled.richText(item.body) && (
            <div className="max-w-none">
              <PrismicRichText
                field={item.body}
                components={{
                  paragraph: ({ children }) => (
                    <p className="text-brand-gray leading-relaxed mb-4 last:mb-0 text-sm">
                      {children}
                    </p>
                  ),
                  heading3: ({ children }) => (
                    <Heading as="h3" size="sm" className="mb-3">
                      {children}
                    </Heading>
                  ),
                  heading4: ({ children }) => (
                    <Heading as="h4" size="xs" className="mb-2">
                      {children}
                    </Heading>
                  ),
                  heading5: ({ children }) => (
                    <Heading as="h5" size="xs" className="mb-2">
                      {children}
                    </Heading>
                  ),
                  heading6: ({ children }) => (
                    <Heading as="h6" size="xs" className="mb-2">
                      {children}
                    </Heading>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-brand-black">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic">{children}</em>
                  ),
                  hyperlink: ({ children }) => (
                    <span className="text-brand-green hover:text-brand-green/80 underline cursor-pointer">
                      {children}
                    </span>
                  ),
                  listItem: ({ children }) => (
                    <li className="text-brand-gray mb-1 text-sm">{children}</li>
                  ),
                  oListItem: ({ children }) => (
                    <li className="text-brand-gray mb-1 text-sm">{children}</li>
                  ),
                  list: ({ children }) => (
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                      {children}
                    </ul>
                  ),
                  oList: ({ children }) => (
                    <ol className="list-decimal pl-6 mb-4 space-y-1">
                      {children}
                    </ol>
                  ),
                  preformatted: ({ children }) => (
                    <pre className="bg-gray-100 p-4 text-sm overflow-x-auto mb-4">
                      <code>{children}</code>
                    </pre>
                  ),
                }}
              />
            </div>
          )}

          {/* Link using ButtonLink component */}
          {isFilled.link(item.link) && (
            <div>
              <ButtonLink field={item.link} color="Link" size="sm" noPadding={true}>
                {item.link.text}
              </ButtonLink>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TabPanelClient; 
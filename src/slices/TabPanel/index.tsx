import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { isFilled } from "@prismicio/client";
import { Bounded } from "@/app/components/Bounded";
import TabPanelClient from "./TabPanelClient";


/**
 * Props for `TabPanel`.
 */
export type TabPanelProps = SliceComponentProps<Content.AccordionSlice>;

/**
 * Component for "TabPanel" Slices.
 */
const TabPanel: FC<TabPanelProps> = ({ slice }) => {
  // Transform Prismic data for client component
  const tabPanelItems = slice.primary.content.map((item, index) => ({
    id: index,
    heading: isFilled.keyText(item.heading) ? item.heading : "",
    body: item.body,
    link: item.link,
    image: item.image,
  }));

  return (
    <div className="relative">
      <Bounded
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        <TabPanelClient items={tabPanelItems} />
      </Bounded>
    </div>
  );
};

export default TabPanel;

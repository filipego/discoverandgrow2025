import { CSSProperties, ElementType, ReactNode } from "react";
import clsx from "clsx";

type BoundedProps = {
  as?: ElementType;
  padding?:
    | "normal padding"
    | "smaller padding"
    | "no padding"
    | "no top padding"
    | "no bottom padding"
    | "bigger padding";
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

export function Bounded({
  as: Comp = "section",
  padding = "normal padding",
  className,
  children,
  ...restProps
}: BoundedProps) {
  return (
    <Comp
      className={clsx(
        "px-6",
        padding === "normal padding" && "py-10",
        padding === "smaller padding" && "py-5",
        padding === "no padding" && "py-0",
        padding === "no top padding" && "pt-0 pb-10",
        padding === "no bottom padding" && "pt-10 pb-0",
        padding === "bigger padding" && "py-10 lg:py-20",
        className
      )}
      {...restProps}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </Comp>
  );
}

import { ReactNode } from "react";
import clsx from "clsx";

export const bgColorMap = {
  "Dark Blue": { bg: "#29285D", text: "#FFFFFF" },
  "Yellow": { bg: "#F1E1A7", text: "inherit" },
  "Green": { bg: "#43C467", text: "inherit" },
  "Orange": { bg: "#F57F15", text: "inherit" }
};

export type ColorSectionProps = {
  bgColor?: string;
  className?: string;
  children: ReactNode;
};

export function ColorSection({
  bgColor,
  className,
  children
}: ColorSectionProps) {
  return (
    <div
      className={clsx(
        className,
        bgColor === "Dark Blue" && "bg-[#29285D] text-white rounded-xl p-[50px_40px]",
        bgColor === "Yellow" && "bg-[#F1E1A7] rounded-xl p-[50px_40px]",
        bgColor === "Green" && "bg-[#43C467] rounded-xl p-[50px_40px]",
        bgColor === "Orange" && "bg-[#F57F15] rounded-xl p-[50px_40px]"
      )}
    >
      {children}
    </div>
  );
}
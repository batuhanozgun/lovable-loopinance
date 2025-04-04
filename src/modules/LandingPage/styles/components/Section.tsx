
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Section bileşeni için stil varyantları
export const sectionVariants = cva(
  "w-full relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "py-10 px-4",
        hero: "py-12 px-4 md:py-20",
        feature: "py-12 px-4",
        cta: "py-10 px-4 relative overflow-hidden",
        pricing: "py-12 px-4",
        footer: "py-8 px-4", // Footer varyantı eklendi
      },
      background: {
        none: "",
        muted: "bg-muted/30",
        gradient: "bg-gradient-to-r from-slate-50/80 via-blue-50/50 to-cyan-50/80 dark:from-slate-900/80 dark:via-slate-800/50 dark:to-slate-900/80",
        hero: "bg-gradient-to-r from-[rgba(250,250,250,1)] via-[rgba(108,154,229,1)] to-[rgba(0,140,158,1)] dark:from-[hsla(210,13%,40%,1)] dark:via-[hsla(185,94%,7%,1)] dark:to-[hsla(0,100%,4%,1)]",
        pattern: "relative before:absolute before:inset-0 before:bg-grid-pattern before:bg-muted/50 before:opacity-30 before:-z-10",
        footer: "bg-muted/80", // Footer arka plan varyantı eklendi
      },
    },
    defaultVariants: {
      variant: "default",
      background: "none",
    },
  }
);

export type SectionVariantsProps = VariantProps<typeof sectionVariants>;

export const Section = ({
  className,
  variant,
  background,
  ...props
}: React.HTMLAttributes<HTMLElement> & SectionVariantsProps) => {
  return (
    <section
      className={cn(sectionVariants({ variant, background }), className)}
      {...props}
    />
  );
};

import { FC, HTMLAttributes } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

interface LargeHeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {}

const headingVariants = cva(
  "max-w-prose text-slate-700 dark:text-slate-300 mb-2 text-center",
  {
    variants: {
      size: {
        default: "text-4xl md:text-5xl lg:text-6xl",
        small: "text-2xl md:text-3xl lg:text-4xl",
        large: "text-5xl md:text-6xl lg:text-7xl",
      },

      defaultVariant: {
        size: "default",
      },
    },
  }
);

const LargeHeading: FC<LargeHeadingProps> = ({
  className,
  children,
  size,
  ...props
}) => {
  return (
    <p className={cn(headingVariants({ className, size }))} {...props}>
      {" "}
      {children}
    </p>
  );
};

export default LargeHeading;

import { FC, HTMLAttributes } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
interface ParagraphProps
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants> {}

const paragraphVariants = cva(
  "max-w-prose text-slate-700 dark:text-slate-300 mb-2 text-center",
  {
    variants: {
      size: {
        default: "text-base sm:text-large",
        small: "text-sm, sm:text-base",
      },

      defaultVariant: {
        size: "default",
      },
    },
  }
);

const Paragraph: FC<ParagraphProps> = ({
  className,
  children,
  size,
  ...props
}) => {
  return (
    <p className={cn(paragraphVariants({ className, size }))} {...props}>
      {" "}
      {children}
    </p>
  );
};

export default Paragraph;

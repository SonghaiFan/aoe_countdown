import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-primary/10 text-primary ring-primary/20 hover:bg-primary/20",
        secondary:
          "bg-secondary/10 text-secondary ring-secondary/20 hover:bg-secondary/20",
        destructive:
          "bg-destructive/10 text-destructive ring-destructive/20 hover:bg-destructive/20",
        warning:
          "bg-yellow-50 text-yellow-800 ring-yellow-600/20 hover:bg-yellow-100",
        success:
          "bg-green-50 text-green-700 ring-green-600/20 hover:bg-green-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, ...props }) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

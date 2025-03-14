
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground border border-input hover:bg-accent hover:text-accent-foreground",
        premium: "bg-gradient-to-r from-agro-green to-agro-light-green text-white",
        success: "bg-green-100 text-green-800 border border-green-200",
        warning: "bg-yellow-100 text-yellow-800 border border-yellow-200",
        info: "bg-blue-100 text-blue-800 border border-blue-200",
        tag: "bg-agro-beige text-agro-brown border border-agro-wheat"
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        bounce: "animate-bounce",
        float: "animate-float",
      }
    },
    defaultVariants: {
      variant: "default",
      animation: "none",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, animation, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, animation }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

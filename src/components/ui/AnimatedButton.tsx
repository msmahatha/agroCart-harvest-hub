
import React, { ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-sm",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        premium: "bg-gradient-to-r from-agro-green to-agro-light-green text-white shadow-md hover:shadow-lg",
        minimal: "bg-transparent hover:bg-muted/50 text-foreground"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-md px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface AnimatedButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  ripple?: boolean;
}

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, variant, size, children, loading, ripple = true, ...props }, ref) => {
    const [coords, setCoords] = React.useState({ x: -1, y: -1 });
    const [isRippling, setIsRippling] = React.useState(false);

    React.useEffect(() => {
      if (coords.x !== -1 && coords.y !== -1) {
        setIsRippling(true);
        setTimeout(() => setIsRippling(false), 500);
      } else {
        setIsRippling(false);
      }
    }, [coords]);

    React.useEffect(() => {
      if (!isRippling) setCoords({ x: -1, y: -1 });
    }, [isRippling]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (ripple) {
        const rect = e.currentTarget.getBoundingClientRect();
        setCoords({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
      props.onClick?.(e);
    };

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onClick={handleClick}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-inherit">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
          </div>
        )}
        <span className={cn("flex items-center justify-center gap-2", { "opacity-0": loading })}>
          {children}
        </span>
        {isRippling && ripple && (
          <span
            className="absolute rounded-full bg-white/30 animate-ripple"
            style={{
              left: coords.x,
              top: coords.y,
              width: "500px",
              height: "500px",
              marginLeft: "-250px",
              marginTop: "-250px",
              transform: "scale(0)",
              animation: "ripple 0.6s linear",
            }}
          />
        )}
      </button>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";

export { AnimatedButton, buttonVariants };

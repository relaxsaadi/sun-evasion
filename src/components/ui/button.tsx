"use client";

import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "gold" | "outline" | "ghost" | "teal";
  size?: "sm" | "md" | "lg" | "xl";
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "gold", size = "md", asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref as React.Ref<HTMLButtonElement>}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 btn-shine cursor-pointer",
          {
            "bg-gradient-to-r from-[#d4a843] to-[#f0c96e] text-black hover:shadow-[0_0_30px_rgba(212,168,67,0.5)] hover:scale-105":
              variant === "gold",
            "border border-[#d4a843] text-[#d4a843] hover:bg-[#d4a843] hover:text-black":
              variant === "outline",
            "text-white/70 hover:text-white hover:bg-white/10": variant === "ghost",
            "bg-gradient-to-r from-[#0891b2] to-[#22d3ee] text-white hover:shadow-[0_0_30px_rgba(8,145,178,0.5)] hover:scale-105":
              variant === "teal",
          },
          {
            "px-4 py-2 text-sm": size === "sm",
            "px-6 py-3 text-base": size === "md",
            "px-8 py-4 text-lg": size === "lg",
            "px-10 py-5 text-xl": size === "xl",
          },
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button };

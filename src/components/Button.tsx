"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: "primary" | "secondary" | "accent" | "danger" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  className,
  disabled = false,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-body font-semibold tracking-normal transition-all duration-200 rounded-lg cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed select-none";

  const variantStyles = {
    primary:
      "bg-[#191919] text-[#F5F3EE] border border-[#191919] hover:bg-[#2E2E2E] active:scale-[0.99] shadow-xs hover:shadow-sm",
    secondary:
      "bg-[#FAF9F5] text-[#191919] border border-[#191919]/20 hover:border-[#191919] hover:bg-[#ECEAE4] active:scale-[0.99]",
    accent:
      "bg-[#B83A24] text-[#F5F3EE] border border-[#B83A24] hover:bg-[#A3321E] active:scale-[0.99] shadow-xs",
    outline:
      "bg-transparent text-[#191919] border border-[#191919]/25 hover:border-[#191919] hover:bg-black/[0.03] active:scale-[0.99]",
    danger:
      "bg-neutral-100 text-[#B83A24] border border-[#B83A24]/30 hover:bg-[#B83A24]/10 active:scale-[0.99]",
    ghost:
      "bg-transparent text-[#191919] hover:bg-black/[0.04] active:scale-[0.99]",
  };

  const sizeStyles = {
    sm: "min-h-[36px] px-3 sm:px-3.5 py-1.5 text-xs gap-1.5",
    md: "min-h-[42px] px-4 sm:px-5 py-2 text-xs sm:text-sm gap-2",
    lg: "min-h-[48px] sm:min-h-[52px] px-6 sm:px-8 py-3 text-sm sm:text-base gap-2.5",
  };

  return (
    <motion.button
      whileTap={disabled ? {} : { scale: 0.985 }}
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
};


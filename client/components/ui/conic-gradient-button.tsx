import React, { ReactNode, CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface ConicGradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  lightColor?: string;
  backgroundColor?: string;
  borderWidth?: number;
  duration?: number;
  blurAmount?: number;
  className?: string;
}

export function ConicGradientButton({
  children,
  lightColor = "#ffffff",
  backgroundColor = "rgba(164, 184, 231, 0.4)",
  borderWidth = 2,
  duration = 3,
  blurAmount = 8,
  className,
  ...props
}: ConicGradientButtonProps) {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center rounded-full overflow-hidden group",
        className
      )}
      style={
        {
          "--border-width": `${borderWidth}px`,
          "--duration": `${duration}s`,
        } as CSSProperties
      }
      {...props}
    >
      {/* Animated single light rotation */}
      <div
        className="absolute animate-conic-spin"
        style={{
          inset: "-4px",
          background: `conic-gradient(from 0deg, transparent 0deg, transparent 270deg, ${lightColor} 320deg, ${lightColor} 340deg, transparent 360deg)`,
          filter: `blur(${blurAmount}px)`,
          borderRadius: "inherit",
        }}
      />
      
      {/* Border */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: `${borderWidth}px solid rgba(255, 255, 255, 0.3)`,
        }}
      />
      
      {/* Inner background */}
      <div
        className="absolute rounded-full backdrop-blur-md"
        style={{
          inset: borderWidth,
          backgroundColor: backgroundColor,
        }}
      />
      
      {/* Content */}
      <span className="relative z-10 px-6 py-2 text-white font-medium">
        {children}
      </span>
    </button>
  );
}


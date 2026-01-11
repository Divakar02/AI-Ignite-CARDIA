import { cn } from "@/lib/utils";
import { ReactNode, HTMLAttributes } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export const GlassCard = ({ children, className, hover = false, ...props }: GlassCardProps) => {
  return (
    <div
      className={cn(
        "glass-card rounded-xl p-6 transition-all duration-300",
        hover && "hover:scale-[1.02] hover:shadow-xl cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

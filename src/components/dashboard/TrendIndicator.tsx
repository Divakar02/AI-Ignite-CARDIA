import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrendIndicatorProps {
  label: string;
  value: string;
  change: number;
  unit?: string;
}

export const TrendIndicator = ({ label, value, change, unit }: TrendIndicatorProps) => {
  const isPositive = change > 0;
  const isNeutral = change === 0;

  return (
    <div className="flex items-center justify-between p-4 bg-card rounded-xl border border-border/50">
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold">
          {value}
          {unit && <span className="text-sm font-normal text-muted-foreground ml-1">{unit}</span>}
        </p>
      </div>
      <div className={cn(
        "flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium",
        isNeutral
          ? "bg-muted text-muted-foreground"
          : isPositive
          ? "bg-success/10 text-success"
          : "bg-destructive/10 text-destructive"
      )}>
        {isNeutral ? (
          <Minus className="h-4 w-4" />
        ) : isPositive ? (
          <TrendingUp className="h-4 w-4" />
        ) : (
          <TrendingDown className="h-4 w-4" />
        )}
        <span>{Math.abs(change)}%</span>
      </div>
    </div>
  );
};

import { GlassCard } from "@/components/ui/GlassCard";
import { User, Heart, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface PatientCardProps {
  name: string;
  age: number;
  condition: string;
  status: "normal" | "attention" | "alert";
  heartRate: number;
}

export const PatientCard = ({ name, age, condition, status, heartRate }: PatientCardProps) => {
  const statusConfig = {
    normal: { label: "Normal", bgClass: "bg-success/10", textClass: "text-success", borderClass: "border-success/30" },
    attention: { label: "Attention", bgClass: "bg-warning/10", textClass: "text-warning", borderClass: "border-warning/30" },
    alert: { label: "Alert", bgClass: "bg-destructive/10", textClass: "text-destructive", borderClass: "border-destructive/30" },
  };

  const config = statusConfig[status];

  return (
    <GlassCard className="relative overflow-hidden">
      {status === "alert" && (
        <div className="absolute inset-0 bg-destructive/5 animate-pulse" />
      )}
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{name}</h3>
              <p className="text-sm text-muted-foreground">{age} years old</p>
            </div>
          </div>
          <div className={cn("px-3 py-1 rounded-full text-xs font-medium border", config.bgClass, config.textClass, config.borderClass)}>
            {config.label}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Activity className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Condition:</span>
            <span className="font-medium">{condition}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Heart className={cn("h-5 w-5", status === "alert" ? "text-destructive animate-heartbeat" : "text-primary")} />
            </div>
            <span className="text-2xl font-bold">{heartRate}</span>
            <span className="text-sm text-muted-foreground">BPM</span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

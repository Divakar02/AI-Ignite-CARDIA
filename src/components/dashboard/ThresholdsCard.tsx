import { GlassCard } from "@/components/ui/GlassCard";
import { AlertTriangle, Heart, Gauge, Thermometer } from "lucide-react";

const thresholds = [
  { label: "Heart Rate", icon: Heart, min: 60, max: 100, unit: "BPM" },
  { label: "Blood Pressure", icon: Gauge, min: 90, max: 140, unit: "mmHg" },
  { label: "SpO2", icon: Thermometer, min: 95, max: 100, unit: "%" },
];

export const ThresholdsCard = () => {
  return (
    <GlassCard>
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="h-5 w-5 text-warning" />
        <h3 className="text-lg font-semibold">Safety Thresholds</h3>
      </div>

      <div className="space-y-4">
        {thresholds.map((threshold) => {
          const Icon = threshold.icon;
          return (
            <div key={threshold.label} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <Icon className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{threshold.label}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {threshold.min} - {threshold.max} {threshold.unit}
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
};

import { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { AlertTriangle, Phone, MessageSquare, X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AlertSimulationProps {
  isActive: boolean;
  onClose: () => void;
}

export const AlertSimulation = ({ isActive, onClose }: AlertSimulationProps) => {
  const [step, setStep] = useState(0);
  const [smsProgress, setSmsProgress] = useState(0);
  const [callProgress, setCallProgress] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setStep(0);
      setSmsProgress(0);
      setCallProgress(0);
      return;
    }

    const stepTimer = setTimeout(() => setStep(1), 500);
    const smsInterval = setInterval(() => {
      setSmsProgress((prev) => {
        if (prev >= 100) {
          clearInterval(smsInterval);
          return 100;
        }
        return prev + 5;
      });
    }, 50);

    const callTimer = setTimeout(() => {
      const callInterval = setInterval(() => {
        setCallProgress((prev) => {
          if (prev >= 100) {
            clearInterval(callInterval);
            return 100;
          }
          return prev + 3;
        });
      }, 50);
    }, 1500);

    return () => {
      clearTimeout(stepTimer);
      clearTimeout(callTimer);
      clearInterval(smsInterval);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
      <GlassCard className="max-w-lg w-full border-destructive/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-destructive/5 animate-pulse" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-destructive animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-destructive">Emergency Alert Triggered</h3>
                <p className="text-sm text-muted-foreground">Abnormal condition detected</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="bg-warning/10 border border-warning/30 rounded-lg p-4 mb-6">
            <p className="text-sm font-medium text-warning">
              ⚠️ This is a simulation for demonstration purposes only. 
              Not intended for actual medical diagnosis.
            </p>
          </div>

          <div className="space-y-4">
            <div className={cn(
              "p-4 rounded-lg border transition-all duration-500",
              smsProgress >= 100 
                ? "bg-success/5 border-success/30" 
                : "bg-muted/30 border-border"
            )}>
              <div className="flex items-center gap-3 mb-3">
                <MessageSquare className={cn(
                  "h-5 w-5",
                  smsProgress >= 100 ? "text-success" : "text-primary"
                )} />
                <span className="font-medium">SMS Alert</span>
                {smsProgress >= 100 && <CheckCircle2 className="h-4 w-4 text-success ml-auto" />}
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-100"
                  style={{ width: `${smsProgress}%` }}
                />
              </div>
              {smsProgress >= 100 && (
                <p className="text-sm text-muted-foreground mt-2 animate-fade-in">
                  ✓ Emergency SMS sent to caregiver
                </p>
              )}
            </div>

            <div className={cn(
              "p-4 rounded-lg border transition-all duration-500",
              callProgress >= 100 
                ? "bg-success/5 border-success/30" 
                : "bg-muted/30 border-border"
            )}>
              <div className="flex items-center gap-3 mb-3">
                <Phone className={cn(
                  "h-5 w-5",
                  callProgress >= 100 ? "text-success" : callProgress > 0 ? "text-warning animate-pulse" : "text-primary"
                )} />
                <span className="font-medium">Phone Call</span>
                {callProgress >= 100 && <CheckCircle2 className="h-4 w-4 text-success ml-auto" />}
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-warning h-2 rounded-full transition-all duration-100"
                  style={{ width: `${callProgress}%` }}
                />
              </div>
              {callProgress > 0 && callProgress < 100 && (
                <p className="text-sm text-warning mt-2 animate-pulse">
                  📞 Calling emergency contact...
                </p>
              )}
              {callProgress >= 100 && (
                <p className="text-sm text-muted-foreground mt-2 animate-fade-in">
                  ✓ Emergency contact reached
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button onClick={onClose} variant="outline">
              Close Simulation
            </Button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

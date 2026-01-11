import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Watch, Cpu, ClipboardList, Phone, LayoutDashboard, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: 1,
    title: "Wearable Data",
    icon: Watch,
    description: "Continuous monitoring of vital signs",
    details: "Our medical-grade wearable continuously monitors heart rate, blood pressure, SpO2, and activity levels. The sensors use clinical-grade accuracy with power-efficient design for 7+ days battery life.",
    color: "primary",
  },
  {
    id: 2,
    title: "Edge Processing",
    icon: Cpu,
    description: "On-device AI analysis",
    details: "All data is processed locally on the edge device using lightweight AI models. This ensures real-time analysis without internet dependency, maintaining privacy and enabling instant responses.",
    color: "secondary",
  },
  {
    id: 3,
    title: "Care Planning",
    icon: ClipboardList,
    description: "Personalized daily care plans",
    details: "AI-generated care plans adapt daily based on health trends. Includes medication reminders, activity goals, and dietary suggestions - all personalized to the patient's condition and progress.",
    color: "accent",
  },
  {
    id: 4,
    title: "GSM Alerts",
    icon: Phone,
    description: "Internet-independent emergency alerts",
    details: "When abnormal conditions are detected, the system triggers GSM-based SMS and voice calls to caregivers and emergency contacts. Works anywhere with cellular coverage, no internet required.",
    color: "warning",
  },
  {
    id: 5,
    title: "Dashboard",
    icon: LayoutDashboard,
    description: "Real-time visualization",
    details: "Caregivers and healthcare providers can access a comprehensive dashboard showing trends, alerts, and care plan progress. Available on any device with responsive design.",
    color: "success",
  },
];

const SystemFlow = () => {
  const [selectedStep, setSelectedStep] = useState<typeof steps[0] | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const getColorClass = (color: string, type: "bg" | "text" | "border") => {
    const colorMap: Record<string, Record<string, string>> = {
      primary: { bg: "bg-primary/10", text: "text-primary", border: "border-primary/30" },
      secondary: { bg: "bg-secondary/10", text: "text-secondary", border: "border-secondary/30" },
      accent: { bg: "bg-accent/10", text: "text-accent-foreground", border: "border-accent/30" },
      warning: { bg: "bg-warning/10", text: "text-warning", border: "border-warning/30" },
      success: { bg: "bg-success/10", text: "text-success", border: "border-success/30" },
    };
    return colorMap[color]?.[type] || "";
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            How <span className="gradient-text">CARDIA</span> Works
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            An interactive walkthrough of our edge-based healthcare system. 
            Click on any step to learn more.
          </p>
        </div>

        {/* Flow Diagram */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isHovered = hoveredStep === step.id;
              
              return (
                <div key={step.id} className="flex items-center w-full md:w-auto">
                  <GlassCard
                    hover
                    className={cn(
                      "w-full md:w-40 text-center cursor-pointer transition-all duration-300 border-2",
                      isHovered 
                        ? `${getColorClass(step.color, "border")} scale-105 shadow-lg` 
                        : "border-transparent"
                    )}
                    onClick={() => setSelectedStep(step)}
                    onMouseEnter={() => setHoveredStep(step.id)}
                    onMouseLeave={() => setHoveredStep(null)}
                  >
                    <div className={cn(
                      "w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center transition-all duration-300",
                      getColorClass(step.color, "bg"),
                      isHovered && "scale-110"
                    )}>
                      <Icon className={cn("h-7 w-7", getColorClass(step.color, "text"))} />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{step.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{step.description}</p>
                  </GlassCard>

                  {index < steps.length - 1 && (
                    <div className="hidden md:flex items-center px-2">
                      <div className="w-8 h-0.5 bg-border relative">
                        <ChevronRight className={cn(
                          "absolute -right-1 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-all duration-300",
                          (hoveredStep === step.id || hoveredStep === steps[index + 1].id) && "text-primary animate-pulse"
                        )} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Cards Below */}
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <GlassCard
                key={step.id}
                hover
                className={cn(
                  "animate-slide-up cursor-pointer",
                  hoveredStep === step.id && "ring-2 ring-primary/30"
                )}
                style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
                onClick={() => setSelectedStep(step)}
                onMouseEnter={() => setHoveredStep(step.id)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                    getColorClass(step.color, "bg")
                  )}>
                    <Icon className={cn("h-6 w-6", getColorClass(step.color, "text"))} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-muted-foreground">Step {step.id}</span>
                    </div>
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      <Dialog open={!!selectedStep} onOpenChange={() => setSelectedStep(null)}>
        <DialogContent className="glass-card border-border/50">
          {selectedStep && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    getColorClass(selectedStep.color, "bg")
                  )}>
                    <selectedStep.icon className={cn("h-5 w-5", getColorClass(selectedStep.color, "text"))} />
                  </div>
                  <DialogTitle>{selectedStep.title}</DialogTitle>
                </div>
                <DialogDescription className="text-base leading-relaxed">
                  {selectedStep.details}
                </DialogDescription>
              </DialogHeader>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SystemFlow;

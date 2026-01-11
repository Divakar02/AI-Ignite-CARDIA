import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Watch, Cpu, Brain, Radio, LayoutDashboard, Database, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

const layers = [
  {
    id: 1,
    title: "Dashboard Layer",
    icon: LayoutDashboard,
    description: "Web-based visualization and control interface",
    details: [
      "React-based responsive web application",
      "Real-time data visualization with Recharts",
      "Care plan management interface",
      "Alert history and notifications",
    ],
    color: "success",
  },
  {
    id: 2,
    title: "GSM Communication",
    icon: Radio,
    description: "Internet-independent alert system",
    details: [
      "SIM800L GSM module integration",
      "SMS alerts to caregivers",
      "Voice call capabilities",
      "Works without internet",
    ],
    color: "warning",
  },
  {
    id: 3,
    title: "Care Planning",
    icon: Brain,
    description: "AI-powered personalized care generation",
    details: [
      "Adaptive daily care plans",
      "Medication scheduling",
      "Activity recommendations",
      "Diet suggestions based on condition",
    ],
    color: "accent",
  },
  {
    id: 4,
    title: "Edge Processing",
    icon: Cpu,
    description: "Local AI inference and data processing",
    details: [
      "ESP32-S3 microcontroller",
      "TensorFlow Lite models",
      "Real-time anomaly detection",
      "Privacy-preserving computation",
    ],
    color: "secondary",
  },
  {
    id: 5,
    title: "Wearable Layer",
    icon: Watch,
    description: "Continuous health monitoring sensors",
    details: [
      "MAX30102 heart rate & SpO2",
      "BMP280 blood pressure",
      "MPU6050 activity tracking",
      "7+ days battery life",
    ],
    color: "primary",
  },
];

const Architecture = () => {
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);

  const getColorClass = (color: string, type: "bg" | "text" | "border" | "glow") => {
    const colorMap: Record<string, Record<string, string>> = {
      primary: { bg: "bg-primary/10", text: "text-primary", border: "border-primary", glow: "shadow-primary/20" },
      secondary: { bg: "bg-secondary/10", text: "text-secondary", border: "border-secondary", glow: "shadow-secondary/20" },
      accent: { bg: "bg-accent", text: "text-accent-foreground", border: "border-accent", glow: "shadow-accent/20" },
      warning: { bg: "bg-warning/10", text: "text-warning", border: "border-warning", glow: "shadow-warning/20" },
      success: { bg: "bg-success/10", text: "text-success", border: "border-success", glow: "shadow-success/20" },
    };
    return colorMap[color]?.[type] || "";
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            System <span className="gradient-text">Architecture</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Layered architecture designed for reliability, privacy, and offline operation. 
            Hover over each layer to see details.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Architecture Diagram */}
          <div className="relative">
            <div className="space-y-4">
              {layers.map((layer, index) => {
                const Icon = layer.icon;
                const isHovered = hoveredLayer === layer.id;

                return (
                  <div key={layer.id}>
                    <GlassCard
                      className={cn(
                        "cursor-pointer transition-all duration-300 border-2",
                        isHovered
                          ? `${getColorClass(layer.color, "border")} shadow-xl ${getColorClass(layer.color, "glow")}`
                          : "border-transparent"
                      )}
                      onMouseEnter={() => setHoveredLayer(layer.id)}
                      onMouseLeave={() => setHoveredLayer(null)}
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                          getColorClass(layer.color, "bg"),
                          isHovered && "scale-110"
                        )}>
                          <Icon className={cn("h-6 w-6", getColorClass(layer.color, "text"))} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{layer.title}</h3>
                          <p className="text-sm text-muted-foreground">{layer.description}</p>
                        </div>
                      </div>
                    </GlassCard>

                    {index < layers.length - 1 && (
                      <div className="flex justify-center py-2">
                        <div className="relative">
                          <div className="w-0.5 h-6 bg-border" />
                          <ArrowUp className={cn(
                            "absolute -top-1 left-1/2 -translate-x-1/2 h-4 w-4 transition-all duration-300",
                            (hoveredLayer === layer.id || hoveredLayer === layers[index + 1]?.id)
                              ? "text-primary animate-bounce"
                              : "text-muted-foreground"
                          )} />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Data Flow Label */}
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden lg:block">
              <div className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full rotate-90">
                Data Flow ↑
              </div>
            </div>
          </div>

          {/* Detail Panel */}
          <div className="space-y-6">
            {hoveredLayer ? (
              <div className="animate-fade-in">
                {layers.filter(l => l.id === hoveredLayer).map(layer => {
                  const Icon = layer.icon;
                  return (
                    <GlassCard key={layer.id} className={cn("border-2", getColorClass(layer.color, "border"))}>
                      <div className="flex items-center gap-4 mb-6">
                        <div className={cn(
                          "w-16 h-16 rounded-2xl flex items-center justify-center",
                          getColorClass(layer.color, "bg")
                        )}>
                          <Icon className={cn("h-8 w-8", getColorClass(layer.color, "text"))} />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold">{layer.title}</h2>
                          <p className="text-muted-foreground">{layer.description}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {layer.details.map((detail, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg animate-slide-up"
                            style={{ animationDelay: `${idx * 50}ms` } as React.CSSProperties}
                          >
                            <Database className="h-4 w-4 text-primary flex-shrink-0" />
                            <span className="text-sm">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </GlassCard>
                  );
                })}
              </div>
            ) : (
              <GlassCard className="text-center py-12">
                <Database className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Hover over a layer</h3>
                <p className="text-muted-foreground">
                  Explore each component of the CARDIA architecture
                </p>
              </GlassCard>
            )}

            {/* Tech Stack Summary */}
            <GlassCard>
              <h3 className="font-semibold mb-4">Technology Stack</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-primary/5 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Hardware</p>
                  <p className="text-sm font-medium">ESP32-S3</p>
                </div>
                <div className="p-3 bg-secondary/5 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">AI</p>
                  <p className="text-sm font-medium">TensorFlow Lite</p>
                </div>
                <div className="p-3 bg-accent/30 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Frontend</p>
                  <p className="text-sm font-medium">React + TS</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Architecture;

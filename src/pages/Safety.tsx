import { GlassCard } from "@/components/ui/GlassCard";
import { Shield, Lock, Eye, AlertTriangle, FileCheck, UserCheck, Server } from "lucide-react";
import { cn } from "@/lib/utils";

const safetyFeatures = [
  {
    icon: AlertTriangle,
    title: "Non-Diagnostic Use",
    description: "CARDIA is designed for monitoring and alerting purposes only. All readings should be verified by healthcare professionals.",
    color: "warning",
  },
  {
    icon: Lock,
    title: "Privacy by Design",
    description: "Health data is processed locally on the edge device. No personal health information is transmitted to cloud servers.",
    color: "primary",
  },
  {
    icon: UserCheck,
    title: "Escalation Rules",
    description: "Clear protocols for when to alert caregivers vs. emergency services. Configurable thresholds based on medical guidance.",
    color: "success",
  },
  {
    icon: Server,
    title: "Local Processing",
    description: "All AI inference happens on-device. Internet connectivity is optional and only used for dashboard sync.",
    color: "secondary",
  },
  {
    icon: Eye,
    title: "Data Transparency",
    description: "Users and caregivers have full visibility into what data is collected, how it's processed, and where it's stored.",
    color: "accent",
  },
  {
    icon: FileCheck,
    title: "Audit Trail",
    description: "Complete logging of all alerts and actions for review by healthcare providers and compliance purposes.",
    color: "primary",
  },
];

const privacyPrinciples = [
  "Data minimization - only collect what's necessary",
  "Purpose limitation - data used only for stated purposes",
  "User control - patients can access and delete their data",
  "Security - encryption at rest and in transit",
  "Transparency - clear policies and consent processes",
];

const Safety = () => {
  const getColorClass = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string }> = {
      primary: { bg: "bg-primary/10", text: "text-primary" },
      secondary: { bg: "bg-secondary/10", text: "text-secondary" },
      accent: { bg: "bg-accent", text: "text-accent-foreground" },
      warning: { bg: "bg-warning/10", text: "text-warning" },
      success: { bg: "bg-success/10", text: "text-success" },
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
            <Shield className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Safety & <span className="gradient-text">Privacy</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Your health data deserves the highest level of protection. 
            CARDIA is built with privacy and safety as core principles.
          </p>
        </div>

        {/* Important Notice */}
        <div className="max-w-3xl mx-auto mb-12">
          <GlassCard className="border-2 border-warning/30 bg-warning/5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="h-6 w-6 text-warning" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Important Medical Disclaimer</h3>
                <p className="text-muted-foreground">
                  CARDIA is a health monitoring system designed to assist with chronic disease management 
                  and emergency alerting. It is <strong>not intended</strong> to diagnose, treat, cure, or 
                  prevent any disease. Always consult with qualified healthcare professionals for medical 
                  decisions. Emergency alerts are informational and should be followed up with proper 
                  medical evaluation.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Safety Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {safetyFeatures.map((feature, index) => {
            const Icon = feature.icon;
            const colors = getColorClass(feature.color);
            
            return (
              <GlassCard
                key={feature.title}
                hover
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
              >
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", colors.bg)}>
                  <Icon className={cn("h-6 w-6", colors.text)} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </GlassCard>
            );
          })}
        </div>

        {/* Privacy Principles */}
        <div className="max-w-3xl mx-auto">
          <GlassCard>
            <div className="flex items-center gap-3 mb-6">
              <Lock className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-bold">Privacy Principles</h2>
            </div>
            
            <div className="space-y-3">
              {privacyPrinciples.map((principle, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` } as React.CSSProperties}
                >
                  <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-success" />
                  </div>
                  <span className="text-sm">{principle}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Trust Badge */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-success/10 rounded-full text-success">
            <Shield className="h-5 w-5" />
            <span className="font-medium">Built with Trust & Transparency</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Safety;

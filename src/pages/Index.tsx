import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Activity, ChevronRight, Heart, Shield, Cpu, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-wearable.png";

const features = [
  {
    icon: Heart,
    title: "Continuous Monitoring",
    description: "Real-time vital signs tracking with edge processing for immediate insights.",
  },
  {
    icon: Cpu,
    title: "Edge Computing",
    description: "On-device AI processing works without internet connectivity.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your health data stays on your device with local processing.",
  },
  {
    icon: Zap,
    title: "Instant Alerts",
    description: "GSM-based emergency alerts work independently of internet.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
                <Activity className="h-4 w-4" />
                <span>AI Ignite Hackathon Project</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                <span className="gradient-text">CARDIA</span>
                <br />
                <span className="text-foreground">Edge-Based Healthcare</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg">
                Internet-independent wearable system for chronic disease care and emergency alerts. 
                Powered by edge AI and GSM connectivity.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/dashboard">
                  <Button size="lg" className="w-full sm:w-auto gap-2 glow-effect">
                    Open Live Dashboard
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/system-flow">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2">
                    View System Flow
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative animate-float">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl scale-75" />
              <img 
                src={heroImage} 
                alt="CARDIA Wearable Device" 
                className="relative z-10 w-full max-w-lg mx-auto drop-shadow-2xl"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32">
                <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-ping" />
                <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-ping" style={{ animationDelay: "0.5s" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why <span className="gradient-text">CARDIA</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Designed for reliability when it matters most. Our edge-based approach ensures 
              continuous care even in areas with limited connectivity.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <GlassCard 
                  key={feature.title} 
                  hover
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hackathon Badge */}
      <section className="py-12 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="glass-card rounded-2xl p-8 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full text-secondary text-sm font-medium mb-4">
              <Zap className="h-4 w-4" />
              <span>AI Ignite Hackathon</span>
            </div>
            <p className="text-lg font-medium">
              Built for AI Ignite Hackathon by{" "}
              <span className="gradient-text font-bold">LLM at Scale.ai</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

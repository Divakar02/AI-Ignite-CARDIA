import { useState } from "react";
import { PatientCard } from "@/components/dashboard/PatientCard";
import { HeartRateChart } from "@/components/dashboard/HeartRateChart";
import { ActivityChart } from "@/components/dashboard/ActivityChart";
import { CarePlanCard } from "@/components/dashboard/CarePlanCard";
import { ThresholdsCard } from "@/components/dashboard/ThresholdsCard";
import { AlertHistoryCard } from "@/components/dashboard/AlertHistoryCard";
import { TrendIndicator } from "@/components/dashboard/TrendIndicator";
import { AlertSimulation } from "@/components/emergency/AlertSimulation";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Calendar, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const [view, setView] = useState<"daily" | "weekly">("daily");
  const [isAlertMode, setIsAlertMode] = useState(false);
  const [showAlertSimulation, setShowAlertSimulation] = useState(false);
  const [patientStatus, setPatientStatus] = useState<"normal" | "attention" | "alert">("normal");
  const [heartRate, setHeartRate] = useState(72);

  const handleSimulateAlert = () => {
    setIsAlertMode(true);
    setPatientStatus("alert");
    setHeartRate(115);
    setShowAlertSimulation(true);
  };

  const handleCloseAlert = () => {
    setShowAlertSimulation(false);
    setTimeout(() => {
      setIsAlertMode(false);
      setPatientStatus("normal");
      setHeartRate(72);
    }, 500);
  };

  return (
    <div className={cn(
      "min-h-screen pt-20 pb-8 transition-colors duration-500",
      isAlertMode && "bg-destructive/5"
    )}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <LayoutDashboard className="h-7 w-7 text-primary" />
              Live Health Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">Real-time monitoring and care insights</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
              <Button
                size="sm"
                variant={view === "daily" ? "default" : "ghost"}
                onClick={() => setView("daily")}
                className="gap-2"
              >
                <Calendar className="h-4 w-4" />
                Daily
              </Button>
              <Button
                size="sm"
                variant={view === "weekly" ? "default" : "ghost"}
                onClick={() => setView("weekly")}
                className="gap-2"
              >
                <Calendar className="h-4 w-4" />
                Weekly
              </Button>
            </div>

            {/* Alert Simulation Button */}
            <Button
              onClick={handleSimulateAlert}
              variant="destructive"
              className="gap-2"
              disabled={isAlertMode}
            >
              <AlertTriangle className="h-4 w-4" />
              Simulate Abnormal Condition
            </Button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Panel */}
          <div className="lg:col-span-3 space-y-6">
            <PatientCard
              name="Sarah Johnson"
              age={58}
              condition="Hypertension, Type 2 Diabetes"
              status={patientStatus}
              heartRate={heartRate}
            />
            <ThresholdsCard />
          </div>

          {/* Main Panel */}
          <div className="lg:col-span-6 space-y-6">
            {/* Trend Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <TrendIndicator label="Avg HR" value="72" unit="BPM" change={-3} />
              <TrendIndicator label="Steps" value="6,842" change={12} />
              <TrendIndicator label="Sleep" value="7.2" unit="hrs" change={5} />
              <TrendIndicator label="SpO2" value="98" unit="%" change={0} />
            </div>

            {/* Charts */}
            <HeartRateChart isAlertMode={isAlertMode} />
            <ActivityChart view={view} />
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-3 space-y-6">
            <CarePlanCard />
            <AlertHistoryCard />
          </div>
        </div>
      </div>

      {/* Alert Simulation Modal */}
      <AlertSimulation isActive={showAlertSimulation} onClose={handleCloseAlert} />
    </div>
  );
};

export default Dashboard;

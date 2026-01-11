import { GlassCard } from "@/components/ui/GlassCard";
import { MessageSquare, Phone, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

interface Alert {
  id: string;
  type: "sms" | "call" | "notification";
  message: string;
  time: string;
  status: "sent" | "pending";
}

const alerts: Alert[] = [
  { id: "1", type: "sms", message: "Elevated heart rate detected", time: "2 hrs ago", status: "sent" },
  { id: "2", type: "call", message: "Emergency contact notified", time: "2 hrs ago", status: "sent" },
  { id: "3", type: "notification", message: "Medication reminder", time: "4 hrs ago", status: "sent" },
  { id: "4", type: "sms", message: "Daily summary sent", time: "8 hrs ago", status: "sent" },
];

const getIcon = (type: Alert["type"]) => {
  switch (type) {
    case "sms":
      return MessageSquare;
    case "call":
      return Phone;
    default:
      return Bell;
  }
};

export const AlertHistoryCard = () => {
  return (
    <GlassCard>
      <h3 className="text-lg font-semibold mb-4">Alert History</h3>

      <div className="space-y-3">
        {alerts.map((alert) => {
          const Icon = getIcon(alert.type);
          return (
            <div
              key={alert.id}
              className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg"
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                alert.type === "call" ? "bg-warning/10" : "bg-primary/10"
              )}>
                <Icon className={cn(
                  "h-4 w-4",
                  alert.type === "call" ? "text-warning" : "text-primary"
                )} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{alert.message}</p>
                <p className="text-xs text-muted-foreground">{alert.time}</p>
              </div>
              <span className={cn(
                "text-xs px-2 py-1 rounded-full",
                alert.status === "sent"
                  ? "bg-success/10 text-success"
                  : "bg-warning/10 text-warning"
              )}>
                {alert.status}
              </span>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
};

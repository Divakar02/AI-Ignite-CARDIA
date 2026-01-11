import { GlassCard } from "@/components/ui/GlassCard";
import { CheckCircle2, Circle, Clock, Pill, Activity, Utensils } from "lucide-react";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  time: string;
  completed: boolean;
  type: "medication" | "activity" | "diet" | "checkup";
}

const tasks: Task[] = [
  { id: "1", title: "Morning BP Check", time: "08:00", completed: true, type: "checkup" },
  { id: "2", title: "Take Medication", time: "09:00", completed: true, type: "medication" },
  { id: "3", title: "15 min Walk", time: "10:00", completed: false, type: "activity" },
  { id: "4", title: "Low-Sodium Lunch", time: "12:30", completed: false, type: "diet" },
  { id: "5", title: "Evening Medication", time: "18:00", completed: false, type: "medication" },
];

const getIcon = (type: Task["type"]) => {
  switch (type) {
    case "medication":
      return Pill;
    case "activity":
      return Activity;
    case "diet":
      return Utensils;
    default:
      return Clock;
  }
};

export const CarePlanCard = () => {
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <GlassCard>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Today's Care Plan</h3>
        <span className="text-sm text-muted-foreground">
          {completedCount}/{tasks.length} completed
        </span>
      </div>

      <div className="w-full bg-muted rounded-full h-2 mb-6">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-500"
          style={{ width: `${(completedCount / tasks.length) * 100}%` }}
        />
      </div>

      <div className="space-y-3">
        {tasks.map((task) => {
          const Icon = getIcon(task.type);
          return (
            <div
              key={task.id}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg transition-colors",
                task.completed ? "bg-success/5" : "bg-muted/50"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                task.completed ? "bg-success/10" : "bg-primary/10"
              )}>
                <Icon className={cn(
                  "h-4 w-4",
                  task.completed ? "text-success" : "text-primary"
                )} />
              </div>
              <div className="flex-1">
                <p className={cn(
                  "text-sm font-medium",
                  task.completed && "line-through text-muted-foreground"
                )}>
                  {task.title}
                </p>
                <p className="text-xs text-muted-foreground">{task.time}</p>
              </div>
              {task.completed ? (
                <CheckCircle2 className="h-5 w-5 text-success" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
};

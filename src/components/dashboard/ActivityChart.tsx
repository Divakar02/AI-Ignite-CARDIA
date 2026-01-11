import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { GlassCard } from "@/components/ui/GlassCard";
import { useEffect, useState } from "react";

interface ActivityChartProps {
  view: "daily" | "weekly";
}

const generateDailyData = () => [
  { time: "6AM", activity: 20, goal: 30 },
  { time: "9AM", activity: 45, goal: 30 },
  { time: "12PM", activity: 60, goal: 30 },
  { time: "3PM", activity: 35, goal: 30 },
  { time: "6PM", activity: 50, goal: 30 },
  { time: "9PM", activity: 25, goal: 30 },
];

const generateWeeklyData = () => [
  { time: "Mon", activity: 4500, goal: 6000 },
  { time: "Tue", activity: 7200, goal: 6000 },
  { time: "Wed", activity: 5800, goal: 6000 },
  { time: "Thu", activity: 6500, goal: 6000 },
  { time: "Fri", activity: 4200, goal: 6000 },
  { time: "Sat", activity: 8100, goal: 6000 },
  { time: "Sun", activity: 3500, goal: 6000 },
];

export const ActivityChart = ({ view }: ActivityChartProps) => {
  const [data, setData] = useState(view === "daily" ? generateDailyData() : generateWeeklyData());
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setData(view === "daily" ? generateDailyData() : generateWeeklyData());
    setAnimationKey((prev) => prev + 1);
  }, [view]);

  return (
    <GlassCard>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Activity Levels</h3>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-secondary" />
            <span className="text-muted-foreground">Activity</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <span className="text-muted-foreground">Goal</span>
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} key={animationKey}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis
              dataKey="time"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Bar
              dataKey="activity"
              fill="hsl(var(--secondary))"
              radius={[4, 4, 0, 0]}
              animationDuration={1000}
            />
            <Bar
              dataKey="goal"
              fill="hsl(var(--accent))"
              radius={[4, 4, 0, 0]}
              animationDuration={1000}
              animationBegin={200}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
};

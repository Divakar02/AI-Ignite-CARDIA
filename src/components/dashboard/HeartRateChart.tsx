import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { GlassCard } from "@/components/ui/GlassCard";
import { useEffect, useState } from "react";

interface HeartRateChartProps {
  isAlertMode?: boolean;
}

const generateData = (isAlert: boolean) => {
  const baseData = [];
  for (let i = 0; i < 24; i++) {
    const hour = i.toString().padStart(2, "0") + ":00";
    const baseRate = isAlert ? 95 : 72;
    const variance = isAlert ? 25 : 12;
    baseData.push({
      time: hour,
      heartRate: baseRate + Math.floor(Math.random() * variance) - variance / 2,
      systolic: 120 + Math.floor(Math.random() * 20) - 10,
      diastolic: 80 + Math.floor(Math.random() * 15) - 7,
    });
  }
  return baseData;
};

export const HeartRateChart = ({ isAlertMode = false }: HeartRateChartProps) => {
  const [data, setData] = useState(generateData(isAlertMode));
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setData(generateData(isAlertMode));
    setAnimationKey((prev) => prev + 1);
  }, [isAlertMode]);

  return (
    <GlassCard>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Heart Rate Trends</h3>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-muted-foreground">Heart Rate</span>
          </div>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} key={animationKey}>
            <defs>
              <linearGradient id="heartRateGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="alertGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis 
              dataKey="time" 
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              domain={[50, 130]}
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
            <Area
              type="monotone"
              dataKey="heartRate"
              stroke={isAlertMode ? "hsl(var(--destructive))" : "hsl(var(--primary))"}
              strokeWidth={2}
              fill={isAlertMode ? "url(#alertGradient)" : "url(#heartRateGradient)"}
              animationDuration={1500}
              animationBegin={0}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
};

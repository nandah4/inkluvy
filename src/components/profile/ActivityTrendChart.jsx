import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ACCESSIBILITY_STATUS } from "../../lib/accessibilityStatus";

const activityData = [
  { day: "Mon", safe: 4, caution: 2 },
  { day: "Tue", safe: 7, caution: 3 },
  { day: "Wed", safe: 6, caution: 2 },
  { day: "Thu", safe: 10, caution: 5 },
  { day: "Fri", safe: 9, caution: 4 },
  { day: "Sat", safe: 13, caution: 6 },
  { day: "Sun", safe: 15, caution: 5 },
];

const series = [
  { key: "safe", label: ACCESSIBILITY_STATUS.safe.label, color: "#10B981" },
  { key: "caution", label: ACCESSIBILITY_STATUS.vulnerable.label, color: "#F59E0B" },
];

function ActivityTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="min-w-32 rounded-xl border border-gray-200 bg-white/95 p-3 shadow-soft backdrop-blur-sm">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400">
        {label}
      </p>
      <div className="space-y-1.5">
        {payload.map((item) => (
          <div
            key={item.dataKey}
            className="flex items-center justify-between gap-5 text-xs"
          >
            <span className="flex items-center gap-2 font-medium text-gray-600">
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              {item.name}
            </span>
            <span className="font-semibold text-gray-950">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ActivityTrendChart() {
  return (
    <div className="flex h-60 min-h-0 flex-col lg:h-auto lg:flex-1">
      <div
        className="min-h-0 flex-1"
        role="img"
        aria-label="Accessible and safe and caution or vulnerable activity trend for the last seven days"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={activityData}
            margin={{ top: 10, right: 6, left: -24, bottom: 0 }}
          >
            <defs>
              <linearGradient id="safeActivityFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity={0.24} />
                <stop offset="100%" stopColor="#10B981" stopOpacity={0.01} />
              </linearGradient>
              <linearGradient id="cautionActivityFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#E5E7EB" strokeDasharray="3 5" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 10, fontWeight: 600 }}
              tickMargin={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 10 }}
              width={42}
              allowDecimals={false}
            />
            <Tooltip
              cursor={{ stroke: "#CBD5E1", strokeDasharray: "4 4" }}
              content={<ActivityTooltip />}
            />
            <Area
              type="monotone"
              dataKey="safe"
              name={ACCESSIBILITY_STATUS.safe.label}
              stroke="#10B981"
              strokeWidth={2.5}
              fill="url(#safeActivityFill)"
              activeDot={{ r: 4, fill: "#10B981", stroke: "#FFFFFF", strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="caution"
              name={ACCESSIBILITY_STATUS.vulnerable.label}
              stroke="#F59E0B"
              strokeWidth={2.5}
              fill="url(#cautionActivityFill)"
              activeDot={{ r: 4, fill: "#F59E0B", stroke: "#FFFFFF", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 flex items-center gap-5 border-t border-gray-200/70 pt-3">
        {series.map((item) => (
          <div key={item.key} className="flex items-center gap-2 text-[11px] font-semibold text-gray-700">
            <span
              className="h-0.5 w-5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

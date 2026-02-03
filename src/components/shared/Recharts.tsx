"use client";


import { useGetInsurerChartDataQuery } from "@/store/feature/meta/metaApi";
import {
  Bar,
  BarChart,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


type RechartsTooltip = {
  active?: boolean;
  payload?: Array<{ payload?: any }>;
};

const CustomTooltip = ({ active, payload }: RechartsTooltip) => {
  if (active && payload && payload.length) {
    const item = payload?.[0]?.payload;
    const currentMonth = item?.currentMonth ?? 0;
    const percentChange = item?.percentChange ?? 0;
    const trend = item?.trend ?? "neutral";

    const isPositive = trend === "positive";
    const isNegative = trend === "negative";
    const isNeutral = trend === "neutral";

    return (
      <div className="bg-white rounded-xl shadow-lg p-3 flex items-center gap-4 min-w-[180px]">
        <div
          className={`p-3 rounded-lg ${isPositive ? "bg-green-50" : isNegative ? "bg-red-50" : "bg-gray-50"
            }`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${isPositive ? "text-green-500" : isNegative ? "text-red-500" : "text-gray-400"
              } w-6 h-6`}
            aria-hidden
          >
            {isPositive ? (
              <path d="M3 16l4-8 4 6 6-10 4 8" />
            ) : isNegative ? (
              <path d="M3 8l4 8 4-6 6 10 4-8" />
            ) : (
              <path d="M5 12h14" />
            )}
          </svg>
        </div>

        <div>
          <p className="text-2xl font-bold text-black">{currentMonth}</p>
          <p
            className={`${isPositive ? "text-green-600" : isNegative ? "text-red-600" : "text-gray-500"
              } font-medium text-sm`}
          >
            {`${Math.round(percentChange)}% `}
            <span className="text-gray-500 font-normal">vs Last Month</span>
          </p>
        </div>
      </div>
    );
  }

  return null;
};

const RechartsComponent = () => {
  const { data: chartResponse, isLoading } = useGetInsurerChartDataQuery();
  const chartData = chartResponse?.data || [];

  return (
    <div className="pt-10 md:pt-28 flex flex-col gap-4 md:gap-16 md:pb-28">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-2xl lg:text-[40px] font-semibold">
          Insurer <span className="text-brand">Insights</span>
        </h2>
        <p className="default-list-text max-w-2xl">
          Most asked-about insurers (last 30 days). Based on Claimly submissions. Not affiliated with any insurer.
        </p>
      </div>

      <div className="w-full h-96 md:h-[500px]">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 30, right: 0, left: 0, bottom: 25 }}
              barCategoryGap="10%"
              barGap={0}
            >
              <XAxis
                dataKey="insurer"
                padding={{ left: 0, right: 0 }}
                tick={{
                  fontSize: 14,
                  fontWeight: 700,
                  fill: "#000",
                }}
                axisLine={{ stroke: "#2563EB" }}
              />

              <Tooltip content={<CustomTooltip />} cursor={false} />

              <Bar
                dataKey="currentMonth"
                fill="#2563EB"
                radius={[8, 8, 0, 0]}
                activeBar={false}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default RechartsComponent;

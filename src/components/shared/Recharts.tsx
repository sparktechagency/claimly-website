"use client";

import { div } from "framer-motion/client";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Sample data
const data = [
  { name: "NRMA", uv: 400 },
  { name: "AAMI", uv: 300 },
  { name: "Allianz", uv: 300 },
  { name: "Youi", uv: 200 },
  { name: "BD", uv: 278 },
  { name: "Suncorp", uv: 189 },
  { name: "RACV", uv: 189 },
  { name: "Other", uv: 189 },
];

const margin = {
  top: 20,
  right: 30,
  left: 20,
  bottom: 25,
};

const formatAxisTick = (value: string) => `*${value}*`;

const renderCustomBarLabel = ({
  x,
  y,
  width,
  value,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) => (
  <text
    x={x + width / 2}
    y={y}
    fill="#475569"
    textAnchor="middle"
    dy={-6}
    fontSize={12}
  >
    {value}
  </text>
);

const RechartsComponent = () => {
  return (
    <div className="pt-10 md:pt-28 flex flex-col gap-4 md:gap-16">
        <div className="flex justify-center flex-col  items-center gap-4">
               <div>
                 <h2 className='text-2xl lg:text-[40px] leading-[120%] font-semibold'>Insurer <span className='text-brand'>  Insights</span></h2>
            </div>
            <div className='flex flex-col gap-4'>
                <p className='default-list-text'>Most asked-about insurers (last 30 days). Based on Claimly submissions. Not affiliated with any insurer.</p>
               
            </div>
        </div>
      <div className="w-full h-96 md:h-[500px] ">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={margin}>
            <XAxis
              dataKey="name"
              tickFormatter={formatAxisTick}
              className="font-bold"
              tick={{ fontSize: 12 }}
            />
            <YAxis tick={{ fontSize: 12 }} className="text-black font-bold" />
            <Tooltip />
            <Bar
              dataKey="uv"
              fill="#2563EB"
              radius={[6, 6, 0, 0]}
              label={renderCustomBarLabel}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RechartsComponent;

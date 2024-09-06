"use client"

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer, TooltipProps } from 'recharts';

interface DataPoint {
  percentile: number;
  numberOfStudents: number;
}

const data: DataPoint[] = [
  { percentile: 0, numberOfStudents: 5 },
  { percentile: 10, numberOfStudents: 10 },
  { percentile: 20, numberOfStudents: 15 },
  { percentile: 30, numberOfStudents: 25 },
  { percentile: 40, numberOfStudents: 30 },
  { percentile: 50, numberOfStudents: 35 },
  { percentile: 60, numberOfStudents: 40 },
  { percentile: 70, numberOfStudents: 30 },
  { percentile: 80, numberOfStudents: 20 },
  { percentile: 90, numberOfStudents: 10 },
  { percentile: 100, numberOfStudents: 5 },
];

const averagePercentile = 72; 

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-300 rounded shadow">
        <p className="font-semibold">{`Percentile: ${label}`}</p>
        <p>{`Number of Students: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const PercentileChart = ({ userPercentile }: { userPercentile: number }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="percentile" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine x={userPercentile} stroke="red" label="Your Percentile" />
        <ReferenceLine x={averagePercentile} stroke="blue" label="Average Percentile" />
        <Line type="monotone" dataKey="numberOfStudents" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PercentileChart;

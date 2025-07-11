'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const stats = [
  { label: 'Users', value: 1240 },
  { label: 'Sales', value: 320 },
  { label: 'Revenue', value: '$12,400' },
  { label: 'Growth', value: '8.2%' },
];

const chartData = [
  { name: 'Jan', users: 400, sales: 240, revenue: 2400 },
  { name: 'Feb', users: 600, sales: 139, revenue: 2210 },
  { name: 'Mar', users: 800, sales: 980, revenue: 2290 },
  { name: 'Apr', users: 700, sales: 390, revenue: 2000 },
  { name: 'May', users: 1100, sales: 480, revenue: 2181 },
  { name: 'Jun', users: 1240, sales: 380, revenue: 2500 },
];

export default function HomeDashboard() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-blue-900">
        Dashboard Overview
      </h1>
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <Card key={stat.label} className="items-center text-center">
            <CardHeader>
              <CardTitle className="text-lg">{stat.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-2xl font-bold text-blue-700">
                {stat.value}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Chart Card */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Users & Sales Trend</CardTitle>
          <CardDescription>Monthly growth of users and sales</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#2563eb"
                  strokeWidth={3}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#f59e42"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

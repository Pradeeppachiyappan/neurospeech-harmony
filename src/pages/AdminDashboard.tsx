import { Layout } from '@/components/layout/Layout';
import { StatCard } from '@/components/dashboard/StatCard';
import { useAuth } from '@/context/AuthContext';
import { 
  Users, 
  Calendar, 
  Globe,
  Activity,
  Server,
  Shield,
  TrendingUp
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

// Mock admin data
const languageData = [
  { name: 'English', value: 65, color: 'hsl(174, 62%, 40%)' },
  { name: 'Tamil', value: 35, color: 'hsl(260, 50%, 65%)' },
];

const emotionDistData = [
  { name: 'Calm', value: 45, color: 'hsl(174, 62%, 40%)' },
  { name: 'Neutral', value: 35, color: 'hsl(200, 15%, 55%)' },
  { name: 'Frustrated', value: 20, color: 'hsl(0, 72%, 51%)' },
];

const weeklyUsage = [
  { day: 'Mon', sessions: 45 },
  { day: 'Tue', sessions: 52 },
  { day: 'Wed', sessions: 48 },
  { day: 'Thu', sessions: 61 },
  { day: 'Fri', sessions: 55 },
  { day: 'Sat', sessions: 38 },
  { day: 'Sun', sessions: 42 },
];

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Platform analytics and system overview
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Total Users"
              value="1,247"
              subtitle="Active accounts"
              icon={Users}
              variant="primary"
              trend={{ value: 12, isPositive: true }}
            />
            <StatCard
              title="Total Sessions"
              value="8,432"
              subtitle="This month"
              icon={Calendar}
              variant="secondary"
              trend={{ value: 18, isPositive: true }}
            />
            <StatCard
              title="Avg. Session Time"
              value="18 min"
              subtitle="Platform average"
              icon={Activity}
              variant="success"
            />
            <StatCard
              title="System Health"
              value="99.9%"
              subtitle="Uptime"
              icon={Server}
              variant="warning"
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Weekly Usage */}
            <div className="glass-card rounded-2xl p-6 lg:col-span-2">
              <h3 className="font-semibold mb-4">Weekly Session Volume</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyUsage}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 20%, 88%)" />
                    <XAxis dataKey="day" stroke="hsl(200, 15%, 45%)" fontSize={12} />
                    <YAxis stroke="hsl(200, 15%, 45%)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(0, 0%, 100%)',
                        border: '1px solid hsl(200, 20%, 88%)',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="sessions" fill="hsl(174, 62%, 40%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Language Distribution */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Language Usage</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={languageData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {languageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-4 mt-2">
                {languageData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {item.name} ({item.value}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Emotion Distribution */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Emotion Distribution (All Users)</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={emotionDistData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {emotionDistData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-4 mt-2">
                {emotionDistData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* System Status */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-semibold mb-4">System Status</h3>
              <div className="space-y-4">
                {[
                  { name: 'API Server', status: 'Operational', health: 100 },
                  { name: 'Speech Analysis Engine', status: 'Operational', health: 99 },
                  { name: 'Emotion Detection', status: 'Operational', health: 98 },
                  { name: 'Database', status: 'Operational', health: 100 },
                ].map((service) => (
                  <div key={service.name} className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-success" />
                      <span className="font-medium">{service.name}</span>
                    </div>
                    <span className="text-sm text-success">{service.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

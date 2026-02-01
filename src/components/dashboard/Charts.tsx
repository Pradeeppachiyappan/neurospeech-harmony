import { useTherapy } from '@/context/TherapyContext';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';

// Mock historical data
const weeklyProgress = [
  { day: 'Mon', pronunciation: 65, fluency: 58, engagement: 72 },
  { day: 'Tue', pronunciation: 68, fluency: 62, engagement: 75 },
  { day: 'Wed', pronunciation: 72, fluency: 65, engagement: 78 },
  { day: 'Thu', pronunciation: 70, fluency: 68, engagement: 74 },
  { day: 'Fri', pronunciation: 75, fluency: 72, engagement: 82 },
  { day: 'Sat', pronunciation: 78, fluency: 75, engagement: 85 },
  { day: 'Sun', pronunciation: 82, fluency: 78, engagement: 88 },
];

const emotionDistribution = [
  { name: 'Calm', value: 45, color: 'hsl(174, 62%, 40%)' },
  { name: 'Neutral', value: 35, color: 'hsl(200, 15%, 55%)' },
  { name: 'Frustrated', value: 20, color: 'hsl(0, 72%, 51%)' },
];

const sessionData = [
  { session: 'S1', duration: 15, score: 68 },
  { session: 'S2', duration: 20, score: 72 },
  { session: 'S3', duration: 18, score: 75 },
  { session: 'S4', duration: 25, score: 78 },
  { session: 'S5', duration: 22, score: 82 },
];

export function ProgressChart() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="font-semibold mb-4">Weekly Progress</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={weeklyProgress}>
            <defs>
              <linearGradient id="pronunciationGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(174, 62%, 40%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(174, 62%, 40%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="fluencyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(260, 50%, 65%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(260, 50%, 65%)" stopOpacity={0} />
              </linearGradient>
            </defs>
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
            <Area
              type="monotone"
              dataKey="pronunciation"
              stroke="hsl(174, 62%, 40%)"
              fill="url(#pronunciationGradient)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="fluency"
              stroke="hsl(260, 50%, 65%)"
              fill="url(#fluencyGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-primary" />
          <span className="text-sm text-muted-foreground">Pronunciation</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-accent" />
          <span className="text-sm text-muted-foreground">Fluency</span>
        </div>
      </div>
    </div>
  );
}

export function EmotionChart() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="font-semibold mb-4">Emotion Distribution</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={emotionDistribution}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {emotionDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(0, 0%, 100%)',
                border: '1px solid hsl(200, 20%, 88%)',
                borderRadius: '8px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-4 mt-2">
        {emotionDistribution.map((item) => (
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
  );
}

export function SessionChart() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="font-semibold mb-4">Session Performance</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sessionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 20%, 88%)" />
            <XAxis dataKey="session" stroke="hsl(200, 15%, 45%)" fontSize={12} />
            <YAxis stroke="hsl(200, 15%, 45%)" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(0, 0%, 100%)',
                border: '1px solid hsl(200, 20%, 88%)',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="score" fill="hsl(174, 62%, 40%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function EngagementTrendChart() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="font-semibold mb-4">Engagement Trend</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={weeklyProgress}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 20%, 88%)" />
            <XAxis dataKey="day" stroke="hsl(200, 15%, 45%)" fontSize={12} />
            <YAxis stroke="hsl(200, 15%, 45%)" fontSize={12} domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(0, 0%, 100%)',
                border: '1px solid hsl(200, 20%, 88%)',
                borderRadius: '8px',
              }}
            />
            <Line
              type="monotone"
              dataKey="engagement"
              stroke="hsl(142, 71%, 45%)"
              strokeWidth={3}
              dot={{ fill: 'hsl(142, 71%, 45%)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
